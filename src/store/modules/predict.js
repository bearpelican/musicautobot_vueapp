import $backend from '@/backend'

export const state = {
  songs: [],
  predictItem: {},
  songItem: {}
}

export const mutations = {
  updateSongItem (state, item) {
    state.songItem = item
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
