// import Vue from 'vue'
// import Vuex from 'vuex'
import { defaultNote } from '@/lib/config'
import $backend from '@/backend'
import { midiToNotes, storeToMidi } from '@/lib/convert'

// Vue.use(Vuex)

export const state = {
  currentNote: defaultNote,
  notes: [],
  prevNotes: [],
  isEditingScore: false,
  scrollPosition: 0,
  previewingKeyNumber: null,
  appState: 'editing',
  bpm: 120,
  name: 'placeholder',
  progressTime: 0
}

export const mutations = {
  updateCurrentNote (state, note) {
    state.currentNote = note
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
  startPreview (state, keyNumber) {
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
  updateProgressTime (state, progressTime) {
    state.progressTime = progressTime
  },
  resetNotes (state) {
    state.progressTime = 0
    state.prevNotes = []
    state.prevNotes = state.notes
    state.notes = []
  },
  async loadMidi (state, midi) {
    console.log('Load midi called:')
    let { notes, bpm, name } = midiToNotes(midi)
    state.notes = notes
    state.bpm = bpm
    state.name = name
  },
  async saveMidi (state) {
    console.log('Save midi called:', state)
    const { midi, name } = storeToMidi(state, null)
    $backend.saveMidi({ midi, name })
  }
}

export function generateSimpleActions (mutations) {
  const actions = {
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
    'updateCurrentNote',
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
    'resetNotes',
    'loadMidi',
    'loadMidiFile',
    'saveMidi'
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
