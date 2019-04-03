import $backend from '@/backend'
import { bufferToMidi, storeToMidi } from '@/lib/convert'

export const state = {
  songs: [],
  pID: null,
  songItem: {},
  nSteps: 150,
  seedLen: 10,
  scoreImage: null,
  midiSong: null,
  midiSeq: null,
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
  updateMidiSong (state, midiSong) {
    state.midiSong = midiSong
  },
  updateMidiSeq (state, midiSeq) {
    state.midiSeq = midiSeq
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
      dispatch('fetchMidi', { midiID: result, type: 'pred' })
    })
  },
  async predictMidiDirect ({ commit, rootState, dispatch }) {
    // const seq = rootState.sequence
    const { nSteps, seedLen } = rootState.predict
    const { midi, bpm } = await storeToMidi(rootState, seedLen)
    // const bpm = 120
    // const midi = await defaultMidiCreation()
    // const midi = await Midi.fromUrl('./audio/sample/chorus_key_cmajor.mid')
    dispatch('sequence/resetNotes', null, { root: true })
    const result = await $backend.predictMidiDirect({ midi, nSteps, bpm })
    console.log('Result returned from predict:', result)
    const midiOut = bufferToMidi(result)
    commit('updateMidiSeq', midiOut)
    dispatch('sequence/loadMidi', midiOut, { root: true })
  },
  async convertToXML ({ commit, rootState, dispatch }) {
    // const seq = rootState.sequence
    const { midi } = await storeToMidi(rootState, null)

    // const bpm = 120
    // const midi = await defaultMidiCreation()
    // const midi = await Midi.fromUrl('./audio/sample/chorus_key_cmajor.mid')
    // $backend.convertToXML({ midi }).then(result => {
    //   console.log('Result returned from convertToXML:', result)
    //   dispatch('updateMidiXML', result)
    // })

    let result = await $backend.convertToXML({ midi })
    console.log('Result returned from convertToXML:', result)
    commit('updateMidiXML', result)
    return result
  },
  fetchScore ({ commit, rootState }) {
    $backend.fetchScore(rootState.predict.pID).then(result => {
      commit('updateScoreImage', result)
    })
  },
  // updateSequenceStore ({ dispatch }, midi) {
  //   dispatch('sequence/loadMidi', midi, { root: true })
  // },
  fetchMidi ({ commit, dispatch }, { midiID, type }) {
    console.log('SJKFLSJFJSLKDFJ FETCH PRED MIDI CALLED')
    dispatch('sequence/resetNotes', null, { root: true })
    $backend.fetchMidi({ midiID, type }).then(result => {
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
