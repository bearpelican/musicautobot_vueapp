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

@app.route('/hello/', methods=['GET', 'POST'])
def hello_world():
    return 'Hello, World!'


@app.route('/songs/all', methods=['GET', 'POST'])
def song_list():
    # get song name and artist from csv
    result = {
        'result': list(htlist.values())[:100]
    }
    return jsonify(result)

# originally for backend searching
# @app.route('/songs/list')
# def song_list():
#     # get song name and artist from csv
#     limit = int(request.values.get('limit', 10))
#     res = list(htlist.values())[:10] # stringify paths. need to figure out a better response
#     result = {
#         'result': res
#     }
#     return jsonify(result)

@app.route('/songs/search', methods=['GET', 'POST'])
def song_search():
    keywords = request.values.get('keywords', '')
    res = search_htlist(htlist, config, keywords)
    result = {
        'result': res
    }
    return jsonify(result)

@app.route('/predict/file', methods=['POST'])
def predict_file():
    args = request.json
    np_file = args['np_file']
    args['np_file'] = file_path/data_dir/np_file
    pred, seed, full = predict_from_file(learn, **args)
    pid = save_preds(pred, seed, full, out_path)
    bpm = htlist[np_file]['ht_bpm']
    midi, score = save_comps(out_path, pid, nptype='full', bpm=bpm)

    result = { 'result': pid }
    return jsonify(result)

@app.route('/predict/midi', methods=['POST'])
def predict_midi():
    args = request.form.to_dict()
    print(args)
    print(request.files)
    print(request.form)
    print(request.data)
    pred, seed, full = predict_from_midi(learn, **args)
    pid = save_preds(pred, seed, full, out_path)
    bpm = htlist[np_file]['ht_bpm']
    midi, score = save_comps(out_path, pid, nptype='full', bpm=bpm)
    
    result = { 'result': pid }
    return jsonify(result)

@app.route('/midi/song/<path:sid>')
def get_song_midi(sid):
    return send_from_directory(file_path/data_dir, htlist[sid]['midi'], mimetype='audio/midi')

@app.route('/midi/pred/<path:pid>')
def get_pred_midi(pid):
    return send_from_directory(out_path, f'{pid}/pred.mid', mimetype='audio/midi')

@app.route('/score/pred/<path:pid>/')
def get_pred_score(pid):
    return send_from_directory(out_path, f'{pid}/pred-1.png', mimetype='image/png')

@app.route('/score/song/<path:sid>/')
def get_song_score(sid):
    score_path = out_path/'song/scores'
    out_file = (score_path/sid).with_suffix('.xml')
    out_file.mkdir(parents=True, exist_ok=True)
    if not out_file.exists():
        midi_file = file_path/data_dir/htlist[sid]['midi']
        stream = file2stream(midi_file) # 1.
        stream.write('musicxml.png', out_file)
    return send_from_directory(out_file.parent, out_file.name, mimetype='image/png')

@app.route('/score/midi/')
def get_midi_score(midi):
    pass