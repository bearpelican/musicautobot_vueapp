# import sys
# sys.path.insert(0, 'src')

from .src.serve import *

from flask import Response, send_from_directory, send_file, request, jsonify
from . import api_bp as app

data_dir = 'data/midi/v9/'
source_dir = 'midi_encode/np/shortdur'

file_path = Path(__file__).parent
path = file_path/data_dir/source_dir
out_path = file_path/'data/generated/'

config = get_config(vocab_path=path/'tmp/all')
saved_models = get_files(path/'models/hook', recurse=True)
load_path = saved_models[0]

data = load_data(path=path, cache_name='tmp/hook', **config)
learn = load_learner(data, config, load_path)
htlist = get_htlist(path, source_dir)

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
    bpm = float(args['bpm']) # (AS) TODO: get bpm from midi file instead

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
    pred, seed, full = predict_from_midi(learn, midi=midi)
    stream = npenc2stream(full, bpm=bpm)

    mid_out = Path(stream.write("midi"))
    print('Wrote to temporary file:', mid_out)
    return send_from_directory(mid_out.parent, mid_out.name, mimetype='audio/midi')

@app.route('/midi/song/<path:sid>')
def get_song_midi(sid):
    return send_from_directory(file_path/data_dir, htlist[sid]['midi'], mimetype='audio/midi')

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