import $backend from '@/backend'
import { bufferToMidi, storeToMidi } from '@/lib/convert'

export const state = {
  songs: [],
  pID: null,
  songItem: {},
  nSteps: 150,
  seedLen: 10,
  scoreImage: null,
  midiXML: null
}

export const mutations = {
  updateSongItem (state, item) {
    state.songItem = item
  },
  updatePID (state, item) {
    state.PID = item
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
  updateScoreImage (state, scoreImage) {
    state.scoreImage = scoreImage
  },
  updateMidiXML (state, xml) {
    state.midiXML = xml
  }
}

export const actions = {
  fetchSongs ({ commit }) {
    $backend.fetchSongs().then(result => {
      commit('updateSongs', result)
    })
  },
  async predictMidi ({ commit, rootState, dispatch }) {
    // const seq = rootState.sequence
    const { nSteps, seedLen } = rootState.predict
    const { midi, bpm } = storeToMidi(rootState.sequence, seedLen)
    dispatch('sequence/resetNotes', null, { root: true })
    const result = await $backend.predictMidi({ midi, nSteps, bpm })
    console.log('Result returned from predict:', result)
    const midiOut = bufferToMidi(result)
    dispatch('sequence/loadMidi', midiOut, { root: true })
  },
  async convertToXML ({ commit, rootState, dispatch }) {
    const { midi } = storeToMidi(rootState.sequence, null)

    let result = await $backend.convertToXML({ midi })
    console.log('Result returned from convertToXML:', result)
    commit('updateMidiXML', result)
    return result
  },
  fetchMidi ({ commit, dispatch }, { midiID, type, name }) {
    console.log('Fetching midi:', midiID, type)
    dispatch('sequence/resetNotes', null, { root: true })
    $backend.fetchMidi({ midiID, type }).then(result => {
      const midi = bufferToMidi(result)
      dispatch('sequence/loadMidi', midi, { root: true })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
