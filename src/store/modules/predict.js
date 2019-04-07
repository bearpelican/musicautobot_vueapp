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
    console.log('Updating loading state:', loadingState)
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
    commit('updateLoadingState', 'Making music...')
    const { nSteps, seedLen } = rootState.predict

    let counter = -2
    const progress = setInterval(() => {
      // console.log('Seconds:', time)
      if (counter > 0) {
        commit('updateLoadingState', `Generating steps (${counter} / ${nSteps})...`)
      }
      counter += 1
    }, 1000 * 2)

    const { midi, bpm, seqName } = storeToMidi(rootState.sequence, seedLen)
    const midiBuffer = await $backend.predictMidi({ midi, nSteps, bpm })

    clearInterval(progress)

    console.log('Result returned from predict:', midiBuffer)
    commit('updateLoadingState', 'Loading sequence...')
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, seqName }, { root: true })
    commit('updateLoadingState', null)
  },
  async convertToXML ({ commit, rootState, dispatch }) {
    const { midi } = storeToMidi(rootState.sequence, null)

    let result = await $backend.convertToXML({ midi })
    console.log('Result returned from convertToXML:', result)
    commit('updateMidiXML', result)
    return result
  },
  async fetchMidi ({ commit, dispatch }, { sid, display: seqName }) {
    console.log('Fetching midi:', sid, seqName)
    // commit('updateLoading', true)
    commit('updateLoadingState', 'Fetching song...')
    const midiBuffer = await $backend.fetchMidi(sid)
    commit('updateLoadingState', 'Loading sequence...')
    await dispatch('sequence/loadMidiBuffer', { midiBuffer, seqName, savePrevious: false }, { root: true })
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
