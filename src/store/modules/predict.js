import $backend from '@/backend'
import { bufferToMidi } from '@/lib/convert'

export const state = {
  songs: [],
  pID: null,
  songItem: {},
  nSteps: 240,
  seedLen: 60,
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
  predict ({ commit }) {
    $backend.predict(this.songItem.numpy, this.nSteps, this.seedLen).then(result => {
      commit('updatePID', result)
    })
  },
  fetchScore ({ commit }) {
    $backend.fetchScore(this.pID).then(result => {
      commit('updateScoreImage', result)
    })
  },
  // updateSequenceStore ({ dispatch }, midi) {
  //   dispatch('sequence/loadMidi', midi, { root: true })
  // },
  fetchPredMidi ({ commit, dispatch }) {
    $backend.fetchPredMidi(this.pID).then(result => {
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
