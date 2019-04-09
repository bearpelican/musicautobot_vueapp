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
  currentLength: defaultLength,
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
  sequenceRange: null,
  sequenceLength: 80,
  // Metadata
  version: 0,
  bpm: 120,
  seqName: 'Placeholder',
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
  },
  finishMusic () {
    state.appState = 'editing'
  },
  updateSynthType (state, { synthType }) {
    state.synthType = synthType
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
      console.log('Load midi called.')
      const { notes, name: midiName, bpm } = midiToNotes(midi)
      if (_.isEmpty(seqName)) seqName = midiName
      console.log('Loaded bpm, name:', bpm, name)
      commit('updateNotes', { notes, bpm, seqName, savePrevious })
    },
    loadMidiBuffer ({ commit, dispatch }, { midiBuffer, seqName, savePrevious = true }) {
      dispatch('loadMidi', { midi: bufferToMidi(midiBuffer), seqName, savePrevious })
    },
    exportMidi ({ commit, state, dispatch }) {
      console.log('Save midi called:', state)
      const { midi, seqName } = storeToMidi(state, null)
      $backend.exportMidi({ midi, fileName: `${seqName}.mid` })
    },
    // saveStore ({ commit, state, rootState, dispatch }) {
    //   console.log('Save midi called:', state)
    //   const { version, notes, bpm, seqName } = state
    //   const { seedLen, durationTemp, noteTemp } = rootState.predict
    //   const storeData = { version, notes, bpm, seqName, seedLen, durationTemp, noteTemp }
    //   $backend.saveStore(storeData)
    // },
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
    'scrollTop',
    'scrollLeft',
    'startPreview',
    'finishPreview',
    'play',
    'stop',
    'finishMusic',
    'updateProgressTime',
    'updateBPM',
    'updateSynthType',
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
