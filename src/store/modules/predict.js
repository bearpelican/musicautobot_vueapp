import $backend from '@/backend'
import { storeToMidi } from '@/lib/convert'

export const state = {
  songs: [],
  songItem: {},
  nSteps: 150,
  seedLen: 10,
  durationTemp: 0.5,
  noteTemp: 1.2,
  midiXML: null,
  firstTime: true,
  loadingState: null
}

export const mutations = {
  updateSongItem (state, item) {
    state.songItem = item
    state.firstTime = false
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
  updateNoteTemp (state, noteTemp) {
    state.noteTemp = noteTemp
  },
  updateDurationTemp (state, durationTemp) {
    state.durationTemp = durationTemp
  },
  updateMidiXML (state, xml) {
    state.midiXML = xml
  },
  updateLoadingState (state, loadingState) {
    state.loadingState = loadingState
  }
}

export const actions = {
  async fetchSongs ({ commit }) {
    $backend.fetchSongs().then(result => {
      commit('updateSongs', result)
    })
  },
  async predictMidi ({ commit, rootState, dispatch }) {
    // const seq = rootState.sequence
    commit('updateLoadingState', 'Generating new sequence...')
    const { nSteps, seedLen } = rootState.predict
    const { midi, bpm, name } = storeToMidi(rootState.sequence, seedLen)
    const midiBuffer = await $backend.predictMidi({ midi, nSteps, bpm })
    console.log('Result returned from predict:', midiBuffer)
    commit('updateLoadingState', 'Loading sequence...')
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, name }, { root: true })
    commit('updateLoadingState', null)
  },
  async convertToXML ({ commit, rootState, dispatch }) {
    const { midi } = storeToMidi(rootState.sequence, null)

    let result = await $backend.convertToXML({ midi })
    console.log('Result returned from convertToXML:', result)
    commit('updateMidiXML', result)
    return result
  },
  async fetchMidi ({ commit, dispatch }, { sid, display: name }) {
    console.log('Fetching midi:', sid, name)
    // commit('updateLoading', true)
    commit('updateLoadingState', 'Fetching song...')
    const midiBuffer = await $backend.fetchMidi(sid)
    commit('updateLoadingState', 'Loading sequence...')
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, name, savePrevious: false }, { root: true })
    commit('updateLoadingState', null)
    // dispatch('sequence/updateName', { name }, { root: true })
    // commit('updateLoading', false)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
