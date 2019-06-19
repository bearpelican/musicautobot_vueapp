# import sys
# sys.path.insert(0, 'src')

from .src.serve import *
from .src.unilm import *
from flask import Response, send_from_directory, send_file, request, jsonify
from . import api_bp as app

import torch
import traceback
torch.set_num_threads(1)

path = Path(__file__).parent/'data_serve'
# config = get_config(vocab_path=path)
config = unilm_config(vocab=vocab)
config['mem_len'] = 1024
config['bptt'] = 2048
data = load_music_data(path=path, cache_name='tmp', vocab=vocab, num_workers=1, **config)

# Refactor pred_batch so we don't have to do this hack
def predict_func(parts): return [p if idx == 1 else F.softmax(p, dim=-1) for idx,p in enumerate(parts)]
loss_func_name = camel2snake(BertLoss.__name__)
basic_train.loss_func_name2activ[loss_func_name] = predict_func

learn = bert_model_learner(data, config.copy(), loss_func=BertLoss())
learn.callbacks = []

load_path = path/'models/v16_unilm.pth'
state = torch.load(load_path, map_location='cpu')
get_model(learn.model).load_state_dict(state['model'], strict=False)

if torch.cuda.is_available(): learn.model.cuda()

def part_enc(chordarr, part):
    partarr = chordarr[:,part:part+1,:]
    npenc = chordarr2npenc(partarr)
    return npenc
    
# NOTE: looks like npenc does not include the separator. 
# This means we don't have to remove the last (separator) step from the seed in order to keep predictions
def s2s_predict_from_midi(learn, midi=None, n_words=200, 
                      temperatures=(1.0,1.0), top_k=24, top_p=0.7, pred_melody=True, **kwargs):

    stream = file2stream(midi) # 1.
    chordarr = stream2chordarr(stream) # 2.
    _,num_parts,_ = chordarr.shape
    melody_np, chord_np = [part_enc(chordarr, i) for i in range(num_parts)]
    

    melody_np, chord_np = (melody_np, chord_np) if avg_pitch(melody_np) > avg_pitch(chord_np) else (chord_np, melody_np) # Assuming melody has higher pitch
    
    offset = 3
    original_shape = melody_np.shape[0] * 2 if pred_melody else chord_np.shape[0] * 2 
    bptt = original_shape + n_words + offset
    bptt = max(bptt, melody_np.shape[0] * 2, chord_np.shape[0] * 2 )
    mpart = partenc2seq2seq(melody_np, part_type=MSEQ, translate=pred_melody, bptt=bptt)
    cpart = partenc2seq2seq(chord_np, part_type=CSEQ, translate=not pred_melody, bptt=bptt)
    if pred_melody:
        xb = torch.tensor(cpart)[None]
        yb = torch.tensor(mpart)[None][:, :original_shape+offset]
    else:
        xb = torch.tensor(mpart)[None]
        yb = torch.tensor(cpart)[None][:, :original_shape+offset]


    if torch.cuda.is_available(): xb, yb = xb.cuda(), yb.cuda()
    
    pred = learn.predict_s2s(xb, yb, n_words=n_words, temperatures=temperatures, top_k=top_k, top_p=top_p)
    # pred = yb

    seed_npenc = to_double_stream(xb.cpu().numpy()) # chord
    yb_npenc = to_double_stream(pred.cpu().numpy()) # melody
    npenc_order = [yb_npenc, seed_npenc] if pred_melody else [seed_npenc, yb_npenc]
    chordarr_comb = combined_npenc2chordarr(*npenc_order)

    return chordarr_comb

# NOTE: looks like npenc does not include the separator. 
# This means we don't have to remove the last (separator) step from the seed in order to keep predictions
def nw_predict_from_midi(learn, midi=None, n_words=600, 
                      temperatures=(1.0,1.0), top_k=24, top_p=0.7, **kwargs):
    seed_np = midi2npenc(midi, skip_last_rest=True) # music21 can handle bytes directly
    xb = torch.tensor(to_single_stream(seed_np))[None]
    pred, seed = learn.predict_nw(xb, n_words=n_words, temperatures=temperatures, top_k=top_k, top_p=top_p)
    # seed = to_double_stream(seed)
    # pred = to_double_stream(pred)
    full = np.concatenate((seed,pred), axis=0)
    return full

@app.route('/predict/midi', methods=['POST'])
def predict_midi():
    args = request.form.to_dict()
    midi = request.files['midi'].read()
    print('PREDICTING UNILM:', args)
    bpm = float(args['bpm']) # (AS) TODO: get bpm from midi file instead
    currentTrack = int(args['currentTrack']) # (AS) TODO: get bpm from midi file instead
    temperatures = (float(args.get('noteTemp', 1.2)), float(args.get('durationTemp', 0.8)))
    n_words = int(args.get('nSteps', 400))

    # Main logic
    try:
        if currentTrack == -1:
            full = nw_predict_from_midi(learn, midi=midi, n_words=n_words, temperatures=temperatures)
            stream = npenc2stream(full, bpm=bpm)
            stream = separate_melody_chord(stream)
        else:
            full = s2s_predict_from_midi(learn, midi=midi, n_words=n_words, temperatures=temperatures, pred_melody=currentTrack == 0)
            stream = chordarr2stream(full, bpm=bpm)
        midi_out = Path(stream.write("midi"))
        print('Wrote to temporary file:', midi_out)
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'Failed to predict: {e}'})

    s3_id = to_s3(midi_out, args)
    result = {
        'result': s3_id
    }
    return jsonify(result)
    # return send_from_directory(midi_out.parent, midi_out.name, mimetype='audio/midi')


# @app.route('/midi/song/<path:sid>')
# def get_song_midi(sid):
#     return send_from_directory(file_path/data_dir, htlist[sid]['midi'], mimetype='audio/midi')

@app.route('/midi/convert', methods=['POST'])
def convert_midi():
    args = request.form.to_dict()
    if 'midi' in request.files:
        midi = request.files['midi'].read()
    elif 'midi_path'in args:
        midi = args['midi_path']

    stream = file2stream(midi) # 1.
    # stream = file2stream(midi).chordify() # 1.
    stream_out = Path(stream.write('musicxml'))
    return send_from_directory(stream_out.parent, stream_out.name, mimetype='xml')


import uuid
import boto3
import json

s3 = boto3.client('s3')
bucket_name = 'ashaw-midi-web-server'

def to_s3(file, args):
    s3_id = str(uuid.uuid4()).replace('-', '')
    base_dir = 'generated/'
    s3_file = base_dir + s3_id + '.mid'
    s3_json = base_dir + s3_id + '.json'
    
    if not isinstance(file, (str, Path)):
        tmp_midi = '/tmp/' + s3_id + '.mid'
        with open(tmp_midi, 'wb') as f:
            f.write(file)
    else: 
        tmp_midi = file

    if not isinstance(args, (str, Path)):
        tmp_json = '/tmp/' + s3_id + '.json'
        with open(tmp_json, 'w') as f:
            json.dump(args, f)
    else: tmp_json = args
    
    # Uploads the given file using a managed uploader, which will split up large
    # files automatically and upload parts in parallel.
    s3.upload_file(str(tmp_midi), bucket_name, s3_file)
    s3.upload_file(str(tmp_json), bucket_name, s3_json)
    print('Saved IDS:', s3_id, s3_id[::-1])
    return s3_id[::-1]

@app.route('/store/save', methods=['POST'])
def save_store():
    args = request.form.to_dict()
    midi = request.files['midi'].read()
    print('Saving store:', args)
    s3_id = to_s3(midi, args)
    result = {
        'result': s3_id
    }
    return jsonify(result)
