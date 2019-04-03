import Midi from '@tonejs/midi'
import { secondsToTiming, timingToSeconds } from '@/lib/positioning'
import _ from 'lodash'

export function midiToNotes (midi) {
  // the file name decoded from the first track
  const name = midi.name

  // get the tracks
  let notes = []
  const bpm = _.get(midi, `header.tempos[0].bpm`, 120)
  midi.tracks.forEach(track => {
    // tracks have notes and controlChanges

    // notes are an array
    track.notes.forEach(note => {
      notes.push({
        key: note.midi,
        timing: secondsToTiming(note.time, bpm),
        length: secondsToTiming(note.duration, bpm)
      })
    })
  })
  return { notes, bpm, name }
}

export function bufferToMidi (arraybuffer) {
  return new Midi(arraybuffer)
}

export function notesToToneNotes (notes, bpm, includeIndex = true) {
  let toneNotes = notes
    .map((note, index) => {
      const toneNote = {
        midi: note.key,
        time: timingToSeconds(note.timing, bpm),
        duration: timingToSeconds(note.length, bpm),
        velocity: 0.8
      }
      console.log('duration:', toneNote.duration, note.length, bpm)
      if (includeIndex) {
        toneNote['index'] = index
      }
      return toneNote
    })
    .sort((a, b) => a.time - b.time)
    .filter(n => n.duration > 0)
  return toneNotes
}

export async function defaultMidiCreation () {
  // create a new midi file
  // create a new midi file
  var midi = new Midi()
  // add a track
  const track = midi.addTrack()
  track.channel = 1
  track.instrument.number = 1
  track.addNote({
    midi: 60,
    time: 0,
    duration: 0.2
  })
    .addNote({
      name: 'C5',
      time: 0.3,
      duration: 0.1
    })
    .addCC({
      number: 64,
      value: 127,
      time: 0.2
    })
  return midi
}

function defaultMidiHeader ({ bpm, name = '' }) {
  const defaultHeader = {
    name,
    ppq: 220,
    meta: [],
    tempos: [{
      ticks: 0,
      bpm: bpm
    }],
    timeSignatures: [{
      ticks: 0,
      timeSignature: [4, 4],
      measures: 0
    }]
  }
  return defaultHeader
}

function defaultTrackHeader ({ name = '' }) {
  return {
    name,
    channel: 0,
    instrument: {
      number: 0,
      name: 'acoustic grand piano',
      family: 'piano'
    },
    controlChanges: {},
    notes: []
  }
}

export function storeToMidi (state, seedLen = null) {
  // create a new midi file
  const { name, bpm } = state
  let storeNotes = state.notes
  if (seedLen != null) {
    storeNotes = storeNotes.filter(n => n.timing <= seedLen)
  }
  var midi = new Midi()
  midi.header.fromJSON(defaultMidiHeader({ bpm, name }))

  let notes = notesToToneNotes(storeNotes, bpm, false)
  console.log('Store to midi Notes:')
  console.log(notes)
  const track = midi.addTrack()
  track.fromJSON(defaultTrackHeader({ name }))
  notes.forEach(n => {
    track.addNote(n)
  })
  return { midi, bpm }
}
