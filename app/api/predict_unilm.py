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


@app.route('/predict/midi', methods=['POST'])
def predict_midi():
    args = request.form.to_dict()
    midi = request.files['midi'].read()
    print('PREDICTING UNILM:', args)
    bpm = float(args['bpm']) # (AS) TODO: get bpm from midi file instead
    prediction_type = args.get('predictionType', 'next') 
    temperatures = (float(args.get('noteTemp', 1.2)), float(args.get('durationTemp', 0.8)))
    n_words = int(args.get('nSteps', 400))

    # Main logic
    try:
        if prediction_type == 'next':
            full = nw_predict_from_midi(learn, midi=midi, n_words=n_words, temperatures=temperatures)
            stream = npenc2stream(full, bpm=bpm)
            stream = separate_melody_chord(stream)
        elif prediction_type in ['melody', 'chords']:
            full = s2s_predict_from_midi(learn, midi=midi, n_words=n_words, temperatures=temperatures, pred_melody=(prediction_type == 'melody'))
            stream = chordarr2stream(full, bpm=bpm)
        elif prediction_type in ['notes', 'rhythm']:
            full = mask_predict_from_midi(learn, midi=midi, temperatures=temperatures, predict_notes=(prediction_type == 'notes'))
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
