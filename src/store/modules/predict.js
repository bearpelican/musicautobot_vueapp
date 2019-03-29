import $backend from '@/backend'
import { bufferToMidi, storeToMidi } from '@/lib/convert'
import Midi from '@tonejs/midi'

export const state = {
  songs: [],
  pID: null,
  songItem: {},
  nSteps: 240,
  seedLen: 10,
  scoreImage: null,
  midiSong: null,
  midiSeq: null
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
  updateMidiSong (state, midiSong) {
    state.midiSong = midiSong
  },
  updateMidiSeq (state, midiSeq) {
    state.midiSeq = midiSeq
  }
}

export const actions = {
  fetchSongs ({ commit }) {
    $backend.fetchSongs().then(result => {
      commit('updateSongs', result)
    })
  },
  predictFile ({ commit, rootState }) {
    const { songItem, nSteps, seedLen } = rootState.predict
    $backend.predictFile(songItem.numpy, nSteps, seedLen).then(result => {
      commit('updatePID', result)
    })
  },
  async predictMidi ({ commit, rootState, dispatch }) {
    // const seq = rootState.sequence
    const { nSteps, seedLen } = rootState.predict
    const { midi, bpm } = await storeToMidi(rootState, seedLen)

    // const bpm = 120
    // const midi = await defaultMidiCreation()
    // const midi = await Midi.fromUrl('./audio/sample/chorus_key_cmajor.mid')
    $backend.predictMidi({ midi, nSteps, bpm }).then(result => {
      commit('updatePID', result)
      console.log('Result returned from predict:', result)
      dispatch('fetchPredMidi', result)
    })
  },
  async predictMidiTest ({ commit, rootState, dispatch }) {
    const { nSteps, seedLen } = rootState.predict
    const midi = await Midi.fromUrl('./audio/sample/chorus_key_cmajor.mid')
    $backend.predictMidi(midi, nSteps, seedLen).then(result => {
      commit('updatePID', result)
      dispatch('fetchPredMidi', result, { root: true })
    })
  },
  fetchScore ({ commit, rootState }) {
    $backend.fetchScore(rootState.predict.pID).then(result => {
      commit('updateScoreImage', result)
    })
  },
  // updateSequenceStore ({ dispatch }, midi) {
  //   dispatch('sequence/loadMidi', midi, { root: true })
  // },
  fetchPredMidi ({ commit, dispatch, rootState }, pID) {
    console.log('SJKFLSJFJSLKDFJ FETCH PRED MIDI CALLED')
    $backend.fetchPredMidi(pID).then(result => {
      const midi = bufferToMidi(result)
      commit('updateMidiSeq', midi)
      dispatch('sequence/loadMidi', midi, { root: true })
    })
  },
  fetchSongMidi ({ commit, dispatch }, songItem) {
    $backend.fetchSongMidi(songItem.sid).then(result => {
      const midi = bufferToMidi(result)
      commit('updateMidiSeq', midi)
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
