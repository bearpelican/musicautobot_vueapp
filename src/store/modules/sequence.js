import { defaultLength, defaultBeats } from '@/lib/config'
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
  origNotes: [],
  // Metadata
  version: 0,
  bpm: 120,
  seqName: 'Untitled',
  duration: 0,
  instrumentType: 'piano',
  playbackVersion: 'prediction'
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
  updatePlaybackVersion (state, { playbackVersion }) {
    state.playbackVersion = playbackVersion
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
  updateOrigNotes (state, { notes }) {
    state.origNotes = notes
  },
  updateNotes (state, { notes, bpm, seqName, savePrevious = true }) {
    state.version += 1
    state.progressTime = 0
    console.log('Version:', state.version)
    state.prevNotes = savePrevious ? state.notes : []
    state.notes = notes
    state.bpm = parseInt(bpm)
    state.seqName = seqName
    state.playbackVersion = 'prediction'
  }
}

export function generateSimpleActions (mutations) {
  const actions = {
    loadMidi ({ commit }, { midi, seqName, savePrevious = true }) {
      const { notes, midiName, bpm } = midiToNotes(midi)
      if (_.isEmpty(seqName)) seqName = midiName
      commit('updateNotes', { notes, bpm, seqName, savePrevious })
      return { notes, bpm }
    },
    loadMidiBuffer ({ dispatch }, { midiBuffer, seqName, savePrevious = true }) {
      return dispatch('loadMidi', { midi: bufferToMidi(midiBuffer), seqName, savePrevious })
    },
    loadOrigBuffer ({ commit }, { midiBuffer }) {
      const midi = bufferToMidi(midiBuffer)
      const { notes } = midiToNotes(midi)
      commit('updateOrigNotes', { notes })
      return notes
    },
    clear ({ commit }) {
      commit('updateNotes', { notes: [], bpm: 120, seqName: 'Untitled', savePrevious: true })
    },
    exportMidi ({ state }) {
      const { midi, seqName } = storeToMidi(state, null)
      $backend.exportMidi({ midi, fileName: `${seqName}.mid` })
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
    'updatePlaybackVersion',
    'updateSeqName'
  ])
}

export const getters = {
  scoreLength: (state, getters) => {
    return Math.max(defaultBeats, getters.sequenceLength + 8)
  },
  sequenceLength: state => {
    return _.round(Math.max(...state.notes.map(n => n.timing + n.length)), 3)
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
  // plugins: [createSynthPlugin]
}
