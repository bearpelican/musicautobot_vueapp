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
  predict (file, nWords, seedLen) {
    $axios.post('predict', { np_file: file, n_words: nWords, seed_len: seedLen })
      .then(response => response.data.result)
  },
  testScore () {
    return this.fetchScore('1de8021e-941b-4047-a881-223103266eba')
  },
  testMidi () {
    return this.fetchMidi('1de8021e-941b-4047-a881-223103266eba')
  },
  fetchMidi (pid) {
    $axios.get(`predict/${pid}/midi`, { responseType: 'arraybuffer' })
      .then(response => response.data)
  }
}
