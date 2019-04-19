# import sys
# sys.path.insert(0, 'src')

from .src.serve import *

from flask import Response, send_from_directory, send_file, request, jsonify
from . import api_bp as app

import torch
torch.set_num_threads(1)

path = Path(__file__).parent/'data_serve'
# config = get_config(vocab_path=path)
config = v10_single_config(vocab_path=path)
config['mem_len'] = 1024
config['bptt'] = 512
data = load_data(path=path, cache_name='tmp', num_workers=1, **config)
learn = load_learner(data, config, path/'model.pth')
# htlist = get_htlist(path, source_dir)

# @app.route('/songs/all', methods=['GET', 'POST'])
# def song_list():
#     # get song name and artist from csv
#     result = {
#         'result': list(htlist.values())[:100]
#         # 'result': list(htlist.values())
#     }
#     return jsonify(result)

# # originally for backend searching
# @app.route('/songs/list')
# def song_list():
#     # get song name and artist from csv
#     limit = int(request.values.get('limit', 10))
#     res = list(htlist.values())[:10] # stringify paths. need to figure out a better response
#     result = {
#         'result': res
#     }
#     return jsonify(result)

# @app.route('/songs/search', methods=['GET', 'POST'])
# def song_search():
#     keywords = request.values.get('keywords', '')
#     res = search_htlist(htlist, config, keywords)
#     result = {
#         'result': res
#     }
#     return jsonify(result)

@app.route('/predict/midi', methods=['POST'])
def predict_midi():
    args = request.form.to_dict()
    midi = request.files['midi'].read()
    print('THE ARGS PASSED:', args)
    bpm = float(args['bpm']) # (AS) TODO: get bpm from midi file instead
    temperatures = (float(args.get('noteTemp', 1.2)), float(args.get('durationTemp', 0.8)))
    n_words = int(args.get('nSteps', 400))
    # debugging 1 - send exact midi back
    # with open('/tmp/test.mid', 'wb') as f:
    #     f.write(midi)
    # return send_from_directory('/tmp', 'test.mid', mimetype='audio/midi')

    # debugging 2 - test music21 conversion
    # stream = file2stream(midi) # 1.

    # debugging 3 - test npenc conversion
    # seed_np = midi2npenc(midi) # music21 can handle bytes directly 
    # stream = npenc2stream(seed_np, bpm=bpm)

    # Main logic
    pred, seed, full = predict_from_midi(learn, midi=midi, n_words=n_words, temperatures=temperatures)
    stream = npenc2stream(full, bpm=bpm)

    midi_out = Path(stream.write("midi"))
    print('Wrote to temporary file:', midi_out)

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
    stream.show('text')
    stream.show('musicxml')
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
