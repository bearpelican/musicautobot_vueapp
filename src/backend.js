import axios from 'axios'
import { saveAs } from 'file-saver'
import _ from 'lodash'

const $axios = axios.create({
  baseURL: process.env.VUE_APP_API_PATH,
  timeout: 180000
  // headers: { 'Content-Type': 'application/json' }
})

const BUCKET = process.env.VUE_APP_S3_BUCKET
const ROUTES = {
  song: 'examples/seed',
  songList: 'examples/json/htlist.json',
  predict: 'generated'
}

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

  // S3 hosting
  async fetchSongs () {
    const response = await $axios.get(BUCKET + ROUTES.songList)
    return response.data
  },
  async fetchMidi (s3id, type) {
    const path = ROUTES[type]
    const rs = s3id.split('').reverse().join('')
    const response = await $axios.get(BUCKET + `${path}/${rs}.mid`, { responseType: 'arraybuffer' })
    return response.data
  },
  async fetchJson (s3id, type) {
    const path = ROUTES[type]
    const rs = s3id.split('').reverse().join('')
    const response = await $axios.get(BUCKET + `${path}/${rs}.json`)
    return response.data
  },
  async loadState (s3id, type = 'predict') {
    const [midiBuffer, store] = await Promise.all([this.fetchMidi(s3id, type), this.fetchJson(s3id, type)])
    return { midiBuffer, store }
  },

  // Predict
  async predictMidi ({ midi, ...args }) {
    const formData = new FormData()
    formData.append('midi', this.midiToBlob(midi))
    _.forOwn(args, (value, key) => {
      formData.append(key, value)
    })
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const response = await $axios.post('predict/midi', formData, config)
    // const response = await $axios.post('store/save', formData, config)
    console.log('Response:', response)
    return response.data
  },
  // Score viewing - perhaps create a separate server
  async convertToXML ({ midi }) {
    const formData = new FormData()
    formData.append('midi', this.midiToBlob(midi))
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    const response = await $axios.post('midi/convert', formData, config)
    return response.data
  },
  midiToBlob (midi) {
    return new Blob([midi.toArray()], { type: 'audio/midi' })
  },
  exportMidi ({ midi, fileName }) {
    saveAs(this.midiToBlob(midi), fileName)
  },
  async saveStore ({ midi, ...args }) {
    const formData = new FormData()
    formData.append('midi', this.midiToBlob(midi))
    _.forOwn(args, (value, key) => {
      formData.append(key, value)
    })
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    // const response = await $axios.post('predict/midi', formData, config)
    const response = await $axios.post('store/save', formData, config)
    console.log('Response:', response)
    return response.data
  }
}
