import axios from 'axios'

let $axios = axios.create({
  baseURL: '/api/',
  timeout: 50000,
  // timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

// Request Interceptor
$axios.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Fake Token'
  return config
})

// Response Interceptor to handle and log errors
$axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // Handle Error
  console.log(error)
  return Promise.reject(error)
})

export default {
  axios: $axios,

  // fetchResource () {
  //   return $axios.get(`resource/xxx`)
  //     .then(response => response.data)
  // },

  // fetchSecureResource () {
  //   return $axios.get(`secure-resource/zzz`)
  //     .then(response => response.data)
  // },

  fetchSongs () {
    return $axios.get('songs/all')
      .then(response => response.data.result)
  },

  fetchScore (pid) {
    return $axios.get(`predict/${pid}/score`, { responseType: 'arraybuffer' })
      .then(response => 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64'))
  },

  // Predict
  predictFile (file, nWords, seedLen) {
    return $axios.post('predict/file', { np_file: file, n_words: nWords, seed_len: seedLen })
      .then(response => response.data.result)
  },
  predictMidi ({ midi, nWords, seedLen = null, bpm = 120 }) {
    const formData = new FormData()
    const blob = new Blob([midi.toArray()], { type: 'audio/midi' })
    formData.append('midi', blob)
    formData.append('n_words', nWords)
    formData.append('bpm', bpm)
    if (seedLen != null) {
      formData.append('seed_len', seedLen)
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return $axios.post('predict/midi', formData, config)
      .then(response => response.data.result)
  },
  testScore () {
    return this.fetchScore('1de8021e-941b-4047-a881-223103266eba')
  },
  testMidi () {
    return this.fetchMidi('1de8021e-941b-4047-a881-223103266eba')
  },
  fetchMidi (pid) {
    return $axios.get(`predict/${pid}/midi`, { responseType: 'arraybuffer' })
      .then(response => response.data)
  },
  fetchPredMidi (pid) {
    return $axios.get(`midi/pred/${pid}`, { responseType: 'arraybuffer' })
      .then(response => response.data)
  },
  fetchSongMidi (sid) {
    return $axios.get(`midi/song/${sid}`, { responseType: 'arraybuffer' })
      .then(response => response.data)
  }
}
