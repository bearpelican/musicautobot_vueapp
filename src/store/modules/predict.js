import $backend from '@/backend'
import { storeToMidi } from '@/lib/convert'
import { PredictionType } from '../../lib/config'

export const state = {
  songs: [],
  songItem: {},
  nSteps: 400,
  seedLen: 10,
  durationTemp: 0.5,
  noteTemp: 1.2,
  midiXML: null,
  tutorialStep: 0,
  loadingState: null,
  predictionType: PredictionType.next
}

export const mutations = {
  updateSongItem (state, item) {
    state.songItem = item
    if (state.tutorialStep < 1) {
      state.tutorialStep = 1
    }
  },
  updateTutorialStep (state, step) {
    if (state.tutorialStep < step) {
      state.tutorialStep = step
    }
  },
  updateSongs (state, songs) {
    state.songs = songs
  },
  updateSteps (state, steps) {
    state.nSteps = steps
  },
  updateSeedLen (state, seedLen) {
    state.seedLen = seedLen
  },
  updatePredictionType (state, predictionType) {
    state.predictionType = predictionType
  },
  updateNoteTemp (state, noteTemp) {
    state.noteTemp = noteTemp
  },
  updateDurationTemp (state, durationTemp) {
    state.durationTemp = durationTemp
  },
  updateMidiXML (state, xml) {
    state.midiXML = xml
  },
  fromSave (state, { seedLen, durationTemp, noteTemp }) {
    state.seedLen = seedLen
    state.durationTemp = durationTemp
    state.noteTemp = noteTemp
  },
  updateLoadingState (state, loadingState) {
    state.loadingState = loadingState
    console.log('Updating loading state:', loadingState)
  },
  showError (state, error, timeout = 2000) {
    state.loadingState = error
    console.log('Updating with error:', error)
    setTimeout(() => {
      state.loadingState = null
    }, timeout)
  }
}

export const actions = {
  async fetchSongs ({ commit }) {
    $backend.fetchSongs().then(result => {
      commit('updateSongs', result)
    })
  },
  async predictMidi ({ commit, rootState, dispatch }) {
    commit('updateLoadingState', 'Making music...')
    commit('updateTutorialStep', 2)

    let { nSteps, seedLen, durationTemp, noteTemp, predictionType } = rootState.predict
    const track = predictionType.track
    if (['notes', 'rhythm'].includes(predictionType.name)) {
      seedLen = null
    }
    const { midi, bpm, seqName } = storeToMidi(rootState.sequence, seedLen, track)

    // Progress
    let counter = -10
    let progress = setInterval(() => {
      // console.log('Seconds:', time)
      if (counter > 0) {
        commit('updateLoadingState', `Generating steps (${counter} / ${nSteps})...`)
      }
      counter += 1
    }, 1000 * 0.25)

    setTimeout(() => {
      if (progress != null) {
        this.clearInterval(progress)
        commit('showError', `Error: Timeout trying to generate sequence...`)
      }
    }, 1000 * 0.25 * nSteps)

    // Predictions
    const { result: s3id, error } = await $backend.predictMidi({ midi, nSteps, bpm, seqName, seedLen, durationTemp, noteTemp, predictionType: predictionType.name })
    if (error) {
      clearInterval(progress)
      commit('showError', `Error: ${error}`)
      return null
    }
    console.log('Predicted id:', s3id)
    const midiBuffer = await $backend.fetchMidi(s3id, 'generated')

    clearInterval(progress)
    progress = null

    console.log('Result returned from predict:', midiBuffer)
    commit('updateLoadingState', 'Loading sequence...')
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, seqName }, { root: true })
    commit('updateLoadingState', null)
    return s3id
  },
  async convertToXML ({ commit, rootState, dispatch }) {
    const { midi } = storeToMidi(rootState.sequence, null)

    let result = await $backend.convertToXML({ midi })
    console.log('Result returned from convertToXML:', result)
    commit('updateMidiXML', result)
    return result
  },
  async loadState ({ commit, dispatch }, s3id) {
    console.log('Loading state:', s3id)
    commit('updateLoadingState', 'Loading saved song...')
    commit('updateTutorialStep', 2)
    const { midiBuffer, store } = await $backend.loadState(s3id, 'generated')
    const { seqName, seedLen, durationTemp, noteTemp } = store
    commit('fromSave', { seedLen, durationTemp, noteTemp })

    await dispatch('sequence/loadMidiBuffer', { midiBuffer, seqName, savePrevious: false }, { root: true })
    commit('updateLoadingState', null)
  },
  async loadSong ({ commit, dispatch }, s3id) {
    console.log('Loading song:', s3id)
    commit('updateLoadingState', 'Loading saved song...')
    commit('updateTutorialStep', 2)
    const { midiBuffer, store } = await $backend.loadState(s3id)
    const { display: seqName } = store
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, seqName, savePrevious: false }, { root: true })
    commit('updateLoadingState', null)
  },
  async fetchMidi ({ commit, dispatch }, { sid, display: seqName }) {
    console.log('Fetching midi:', sid, seqName)
    commit('updateLoadingState', 'Loading song...')
    const midiBuffer = await $backend.fetchMidi(sid)
    commit('updateLoadingState', 'Building sequence...')
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, seqName, savePrevious: false }, { root: true })
    commit('updateLoadingState', null)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
