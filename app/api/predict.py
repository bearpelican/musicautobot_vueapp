# import sys
# sys.path.insert(0, 'src')

from .src.serve import *

from flask import Response, send_from_directory, send_file, request, jsonify
from . import api_bp as app

data_dir = 'data/midi/v9/'
source_dir = 'midi_encode/np/shortdur/'

file_path = Path(__file__).parent
path = file_path/data_dir/source_dir
out_path = file_path/'data/generated/'

config = get_config(path, cache='tmp/hook')
saved_models = get_files(path/'models/hook', recurse=True)
load_path = saved_models[0]

data = load_data(**config)
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
    res = search_htlist(files, config, keywords)
    result = {
        'result': res
    }
    return jsonify(result)

@app.route('/predict', methods=['POST'])
def predict():
    args = request.json
    # print(request)
    # print(request.form)
    # print(request.files)
    # print(request.data)
    # print(request.json)
    # print('sldfjdsklfjdskl')
    args['np_file'] = file_path/data_dir/args['np_file']
    pred, seed, full = generate_predictions(learn, n_words=10, **args)
    pid = save_preds(pred, seed, full, out_path)
    bpm = htlist[args['np_file']]['ht_bpm']
    midi, score = save_comps(out_path, pid, bpm=bpm)
    
    res = {
        'midi': midi.name,
        'score': score.name,
        'pid': pid
    }
    result = { 'result': res }
    return jsonify(result)

@app.route("/predict/<path:pid>/score/")
def pred_score(pid):
#     path = out_path/pid/'pred-1.png'
#     return send_file(path, mimetype='image/png')

    response = send_from_directory(out_path, f'{pid}/pred-1.png', mimetype='image/png')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/predict/<path:pid>/midi/")
def pred_midi(pid):
#     path = out_path/pid/'pred.mid'
#     return send_file(path, mimetype='audio/midi')
    return send_from_directory(out_path, f'{pid}/pred.mid', mimetype='audio/midi')

