// import Vue from 'vue'
// import Vuex from 'vuex'
import { defaultLength } from '@/lib/config'
import $backend from '@/backend'
import { midiToNotes, storeToMidi, bufferToMidi } from '@/lib/convert'

// Vue.use(Vuex)

export const state = {
  // UI state
  progressTime: 0,
  currentLength: defaultLength,
  selectedNote: null,
  isEditingScore: false,
  scrollPosition: 0,
  previewingKeyNumber: null,
  appState: 'editing',
  // Notes
  notes: [],
  prevNotes: [],
  history: [], // (AS) save history so people can revert { metadata, notes }
  // Metadata
  version: 0,
  bpm: 120,
  name: 'placeholder',
  duration: 0,
  synthType: 'piano'
}

export const mutations = {
  updateCurrentLength (state, noteLength) {
    state.currentLength = noteLength
  },
  updateSelectedNote (state, index) {
    state.selectedNote = index
  },
  addNote (state, { key, timing, length }) {
    state.notes.push({
      key,
      timing,
      length
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
  scroll (state, scrollPosition) {
    state.scrollPosition = scrollPosition
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
  },
  finishMusic () {
    state.appState = 'editing'
  },
  updateSynthType (state, { synthType }) {
    state.synthType = synthType
  },
  updateBPM (state, { bpm }) {
    state.bpm = bpm
  },
  updateProgressTime (state, progressTime) {
    state.progressTime = progressTime
  },
  updateNotes (state, { notes, bpm, name, savePrevious = true }) {
    state.version += 1
    state.progressTime = 0
    console.log('Version:', state.version)
    state.prevNotes = savePrevious ? state.notes : []
    state.notes = notes
    state.bpm = bpm
    state.name = name
  }
}

export function generateSimpleActions (mutations) {
  const actions = {
    loadMidi ({ commit, dispatch }, { midi, savePrevious = true }) {
      console.log('Load midi called.')
      const { notes, bpm, name } = midiToNotes(midi)
      commit('updateNotes', { notes, bpm, name, savePrevious })
    },
    loadMidiBuffer ({ commit, dispatch }, { midiBuffer, savePrevious = true }) {
      dispatch('loadMidi', { midi: bufferToMidi(midiBuffer), savePrevious })
    },
    exportMidi ({ commit, state, dispatch }) {
      console.log('Save midi called:', state)
      const { midi, name } = storeToMidi(state, null)
      $backend.exportMidi({ midi, name })
    },
    importMidi ({ commit, rootState, dispatch }, midiBuffer) {
      console.log('Importing midi file')
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
    'scroll',
    'startPreview',
    'finishPreview',
    'play',
    'stop',
    'finishMusic',
    'updateProgressTime',
    'updateBPM',
    'updateSynthType'
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
