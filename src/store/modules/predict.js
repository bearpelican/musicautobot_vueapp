import $backend from '@/backend'
import { storeToMidi } from '@/lib/convert'

export const state = {
  songs: [],
  pID: null,
  songItem: {},
  nSteps: 150,
  seedLen: 10,
  durationTemp: 0.5,
  noteTemp: 1.2,
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
  updateNoteTemp (state, noteTemp) {
    state.nSteps = noteTemp
  },
  updateDurationTemp (state, durationTemp) {
    state.durationTemp = durationTemp
  },
  updateScoreImage (state, scoreImage) {
    state.scoreImage = scoreImage
  },
  updateMidiXML (state, xml) {
    state.midiXML = xml
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
    const { nSteps, seedLen } = rootState.predict
    const { midi, bpm, name } = storeToMidi(rootState.sequence, seedLen)
    const midiBuffer = await $backend.predictMidi({ midi, nSteps, bpm })
    console.log('Result returned from predict:', midiBuffer)
    dispatch('sequence/loadMidiBuffer', { midiBuffer, name }, { root: true })
  },
  async convertToXML ({ commit, rootState, dispatch }) {
    const { midi } = storeToMidi(rootState.sequence, null)

    let result = await $backend.convertToXML({ midi })
    console.log('Result returned from convertToXML:', result)
    commit('updateMidiXML', result)
    return result
  },
  async fetchMidi ({ commit, dispatch }, { sid, name }) {
    console.log('Fetching midi:', sid, name)
    const midiBuffer = await $backend.fetchMidi(sid)
    dispatch('sequence/loadMidiBuffer', { midiBuffer, name, savePrevious: false }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
