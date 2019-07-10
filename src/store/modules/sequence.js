// import Vue from 'vue'
// import Vuex from 'vuex'
import { defaultLength } from '@/lib/config'
import $backend from '@/backend'
import { midiToNotes, storeToMidi, bufferToMidi } from '@/lib/convert'
import _ from 'lodash'

// Vue.use(Vuex)

export const state = {
  // UI state
  progressTime: 0,
  playOffset: 0,
  currentLength: defaultLength,
  currentTrack: 0,
  selectedNote: null,
  isEditingScore: false,
  scrollTopPosition: 0,
  scrollLeftPosition: 0,
  previewingKeyNumber: null,
  appState: 'editing',
  // Notes
  notes: [],
  prevNotes: [],
  history: [{ version: 1 }, { version: 2 }], // (AS) save history so people can revert { metadata, notes }
  sequenceLength: 80,
  // Metadata
  version: 0,
  bpm: 120,
  seqName: 'Untitled',
  duration: 0,
  instrumentType: 'piano'
}

export const mutations = {
  updateCurrentLength (state, noteLength) {
    state.currentLength = noteLength
  },
  updateSelectedNote (state, index) {
    state.selectedNote = index
  },
  addNote (state, { key, timing, length, track }) {
    state.notes.push({
      key,
      timing,
      length,
      track
    })
  },
  updateNoteLength (state, { index, length }) {
    state.notes[index].length = length
  },
  updateNoteTiming (state, { index, timing }) {
    state.notes[index].timing = timing
  },
  updateNoteKeyNumber (state, { index, keyNumber }) {
    state.notes[index].key = keyNumber
  },
  removeNote (state, index) {
    state.notes.splice(index, 1)
  },
  startEditingScore (state) {
    state.isEditingScore = true
  },
  finishEditingScore (state) {
    state.isEditingScore = false
  },
  scrollTop (state, scrollTopPosition) {
    state.scrollTopPosition = scrollTopPosition
  },
  scrollLeft (state, scrollLeftPosition) {
    state.scrollLeftPosition = scrollLeftPosition
  },
  startPreview (state, { keyNumber, timeout }) {
    state.previewingKeyNumber = keyNumber
  },
  finishPreview (state) {
    state.previewingKeyNumber = null
  },
  play (state) {
    state.appState = 'playing'
  },
  stop (state) {
    state.appState = 'editing'
    state.progressTime = state.playOffset
  },
  finishMusic () {
    state.appState = 'editing'
  },
  updateInstrumentType (state, { instrumentType }) {
    state.instrumentType = instrumentType
  },
  updateTrack (state, { track }) {
    state.currentTrack = track
  },
  updateBPM (state, bpm) {
    state.bpm = parseInt(bpm)
  },
  updateSeqName (state, seqName) {
    state.seqName = seqName
  },
  updateProgressTime (state, progressTime) {
    state.progressTime = progressTime
  },
  updatePlayOffset (state, playOffset) {
    state.playOffset = playOffset
  },
  updateHistory (state) {
    const { version, notes, bpm, seqName } = state
    if (!_.isEmpty(notes)) {
      history.push({
        version, notes, bpm, seqName
      })
    }
  },
  updateNotes (state, { notes, bpm, seqName, savePrevious = true }) {
    state.version += 1
    state.progressTime = 0
    console.log('Version:', state.version)
    state.prevNotes = savePrevious ? state.notes : []
    state.notes = notes
    state.bpm = parseInt(bpm)
    state.seqName = seqName
  }
}

export function generateSimpleActions (mutations) {
  const actions = {
    loadMidi ({ commit, state, dispatch }, { midi, seqName, savePrevious = true }) {
      const { notes, name: midiName, bpm } = midiToNotes(midi)
      if (_.isEmpty(seqName)) seqName = midiName
      commit('updateNotes', { notes, bpm, seqName, savePrevious })
    },
    loadMidiBuffer ({ commit, dispatch }, { midiBuffer, seqName, savePrevious = true }) {
      dispatch('loadMidi', { midi: bufferToMidi(midiBuffer), seqName, savePrevious })
    },
    clear ({ commit }) {
      commit('updateNotes', { notes: [], bpm: 120, seqName: 'Untitled', savePrevious: true })
    },
    exportMidi ({ commit, state, dispatch }) {
      const { midi, seqName } = storeToMidi(state, null)
      $backend.exportMidi({ midi, fileName: `${seqName}.mid` })
    },
    importMidi ({ commit, rootState, dispatch }, midiBuffer) {
      dispatch('loadMidiBuffer', { midiBuffer, savePrevious: false })
    }
  }
  mutations.forEach(mutation => {
    actions[mutation] = ({ commit }, payload) => {
      if (payload === 0 || payload) {
        commit(mutation, payload)
      } else {
        commit(mutation)
      }
    }
  })
  return actions
}

export const actions = {
  ...generateSimpleActions([
    'updateCurrentLength',
    'addNote',
    'removeNote',
    'updateNoteLength',
    'updateNoteTiming',
    'updateNoteKeyNumber',
    'startEditingScore',
    'finishEditingScore',
    'scrollTop',
    'scrollLeft',
    'startPreview',
    'finishPreview',
    'play',
    'stop',
    'finishMusic',
    'updateProgressTime',
    'updateBPM',
    'updateInstrumentType',
    'updateTrack',
    'updateSeqName'
  ])
}

// export default new Vuex.Store({
//   state,
//   mutations,
//   actions,
//   plugins: [createSynthPlugin]
// })

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
