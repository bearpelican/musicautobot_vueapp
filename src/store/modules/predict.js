import $backend from '@/backend'

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
  fetchMidi ({ commit }) {
    $backend.fetchMidi(this.pID).then(result => {
      commit('updateMidiSong', result)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
