import axios from 'axios'
import { saveAs } from 'file-saver'
import _ from 'lodash'

let $axios = axios.create({
  baseURL: '/api/',
  timeout: 80000,
  // timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})

const S3BUCKET = 'https://s3-us-west-2.amazonaws.com/ashaw-midi-web-server/'

// Request Interceptor
// $axios.interceptors.request.use(function (config) {
//   config.headers['Authorization'] = 'Fake Token'
//   return config
// })

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
    const response = await $axios.get(S3BUCKET + 'json/htlist.json')
    // console.log(response)
    return response.data
  },
  async fetchMidi (s3id, path = 'v13/seed') {
    const rs = s3id.split('').reverse().join('')
    const response = await $axios.get(S3BUCKET + `${path}/${rs}.mid`, { responseType: 'arraybuffer' })
    // console.log(response)
    return response.data
  },
  async fetchJson (s3id, path = 'v13/seed') {
    const rs = s3id.split('').reverse().join('')
    const response = await $axios.get(S3BUCKET + `${path}/${rs}.json`, { responseType: 'application/json' })
    return response.data
  },
  async loadState (s3id, path) {
    // const rs = s3id.split('').reverse().join('')
    const r1 = await this.fetchMidi(s3id, path)
    const r2 = await this.fetchJson(s3id, path)
    return { midiBuffer: r1, store: r2 }
  },

  // Predict
  // async predictFile (file, nSteps, seedLen) {
  //   const response = await $axios.post('predict/file', { np_file: file, n_steps: nSteps, seed_len: seedLen })
  //   return this.fetchMidi(response.data.result, 'generated')
  // },
  // async predictMidi ({ midi, ...args }) {
  //   const formData = new FormData()
  //   formData.append('midi', this.midiToBlob(midi))
  //   _.forOwn(args, (value, key) => {
  //     formData.append(key, value)
  //   })
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     },
  //     responseType: 'arraybuffer'
  //   }
  //   const response = await $axios.post('predict/midi', formData, config)
  //   // const response = await $axios.post('store/save', formData, config)
  //   console.log('Response:', response)
  //   return response.data
  // },

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
  // async saveStore ({ midi, ...args }) {
  //   const formData = new FormData()
  //   formData.append('midi', this.midiToBlob(midi))
  //   _.forOwn(args, (value, key) => {
  //     formData.append(key, value)
  //   })
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   }
  //   // const response = await $axios.post('predict/midi', formData, config)
  //   const response = await $axios.post('store/save', formData, config)
  //   console.log('Response:', response)
  //   return response.data
  // }
}
