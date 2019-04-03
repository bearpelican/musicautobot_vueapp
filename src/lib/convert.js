import Midi from '@tonejs/midi'
import { secondsToTiming, timingToSeconds } from '@/lib/positioning'
import _ from 'lodash'

export async function midiFileToNotes (midiFile) {
  // load a midi file in the browser
  const midi = await Midi.fromUrl(midiFile)
  return midiToNotes(midi)
}

export function midiToNotes (midi) {
  // the file name decoded from the first track
  // const name = midi.name
  // get the tracks
  let notes = []
  const bpm = _.get(midi, `header.tempos[0].bpm`, 120)
  console.log('Loaded midi:')
  console.log(midi)
  console.log(JSON.stringify(midi.header))
  midi.tracks.forEach(track => {
    // tracks have notes and controlChanges

    // notes are an array
    track.notes.forEach(note => {
      notes.push({
        key: note.midi,
        timing: secondsToTiming(note.time, bpm),
        length: secondsToTiming(note.duration, bpm)
      })
      // note.midi, note.time, note.duration, note.name
    })

    // the control changes are an object
    // the keys are the CC number
    // track.controlChanges[64]
    // they are also aliased to the CC number's common name (if it has one)
    // track.controlChanges.sustain.forEach(cc => {
    //   // cc.ticks, cc.value, cc.time
    // })

    // the track also has a channel and instrument
    // track.instrument.name
  })

  const storeNotes = notes.filter(n => n.timing <= 10)
  console.log('Midi to notes:', storeNotes) // DEBUG
  return { notes: storeNotes, bpm, header: midi.header }
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
      if (includeIndex) {
        toneNote['index'] = index
      }
      return toneNote
    })
    .sort((a, b) => a.time - b.time)
    .filter(n => n.duration > 0)
  console.log('Notes to tone notes called:', toneNotes)
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

function defaultMidiHeader (bpm) {
  const defaultHeader = {
    name: '',
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

export async function storeToMidi (state, seedLen = null) {
  // create a new midi file
  const bpm = state.sequence.bpm
  // const header = state.sequence.header
  let storeNotes = state.sequence.notes
  if (seedLen != null) {
    storeNotes = storeNotes.filter(n => n.timing <= seedLen)
  }
  var midi = new Midi()
  midi.header.fromJSON(defaultMidiHeader(bpm))

  let notes = notesToToneNotes(storeNotes, bpm, false)
  const track = midi.addTrack()
  notes.forEach(n => {
    track.addNote(n)
  })

  console.log('Store to midi Notes:', notes)
  return { midi, bpm }
}
