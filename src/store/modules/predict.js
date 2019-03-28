import $backend from '@/backend'

export const state = {
  songs: [],
  predictItem: {},
  songItem: {},
  nSteps: 240,
  seedLen: 60
}

export const mutations = {
  updateSongItem (state, item) {
    state.songItem = item
  },
  updatePredictItem (state, item) {
    state.predictItem = item
  },
  updateSongs (state, songs) {
    state.songs = songs
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
      commit('updatePredictItem', result)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
