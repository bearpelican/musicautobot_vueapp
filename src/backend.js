import axios from 'axios'
import { saveAs } from 'file-saver'

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

  async fetchSongs () {
    const response = await $axios.get('songs/all')
    return response.data.result
  },
  // Predict
  async predictFile (file, nWords, seedLen) {
    const response = await $axios.post('predict/file', { np_file: file, n_words: nWords, seed_len: seedLen })
    return response.data.result
  },
  async predictMidi ({ midi, nWords, bpm = 120 }) {
    const formData = new FormData()
    formData.append('midi', this.midiToBlob(midi))
    formData.append('n_words', nWords)
    formData.append('bpm', bpm)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      responseType: 'arraybuffer'
    }
    const response = await $axios.post('predict/midi', formData, config)
    console.log('Response:', response)
    return response.data
  },
  async fetchMidi ({ midiID, type }) {
    const response = await $axios.get(`midi/${type}/${midiID}`, { responseType: 'arraybuffer' })
    return response.data
  },
  async convertToXML ({ midi }) {
    const formData = new FormData()
    formData.append('midi', this.midiToBlob(midi))
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const response = await $axios.post('midi/convert', formData, config)
    // console.log('Convert to xml response')
    // console.log(response.data)
    return response.data
  },
  midiToBlob (midi) {
    return new Blob([midi.toArray()], { type: 'audio/midi' })
  },
  exportMidi ({ midi, fileName }) {
    saveAs(this.midiToBlob(midi), fileName)
  }
}
