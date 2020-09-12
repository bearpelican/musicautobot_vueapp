import { Midi } from '@tonejs/midi'
import { secondsToTiming, timingToSeconds } from '@/lib/positioning'
import _ from 'lodash'

export function midiToNotes (midi) {
  // the file name decoded from the first track
  const midiName = midi.name
  // get the tracks
  const bpm = _.get(midi, 'header.tempos[0].bpm', 120)
  const notes = []
  midi.tracks.forEach((track, trackIndex) => {
    track.notes.forEach(note => {
      notes.push({
        key: note.midi,
        track: trackIndex,
        timing: secondsToTiming(note.time, bpm),
        length: secondsToTiming(note.duration, bpm)
      })
    })
  })
  return { notes, bpm, midiName }
}

export function bufferToMidi (arraybuffer) {
  return new Midi(arraybuffer)
}

export function notesToToneNotes (notes, bpm, includeIndex = true) {
  const toneNotes = notes
    .map((note, index) => {
      const toneNote = {
        midi: note.key,
        track: note.track,
        time: _.round(timingToSeconds(note.timing, bpm), 3),
        duration: timingToSeconds(note.length, bpm),
        velocity: 0.8
      }
      if (includeIndex) {
        toneNote.index = index
      }
      return toneNote
    })
    .sort((a, b) => a.time - b.time)
    .filter(n => n.duration > 0)
    .filter(n => n.time >= -0.1)
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
    }],
    keySignatures: [{
      key: 'C',
      scale: 'major',
      ticks: 0
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

export function storeToMidi (state, seedLen = null, track = -1) {
  // create a new midi file
  const { seqName, bpm } = state
  let storeNotes = state.notes

  if (seedLen != null) {
    storeNotes = storeNotes.filter(n => {
      const keepTrackNote = (track !== -1) && (n.track !== track)
      const isSeed = _.round(n.timing, 3) < seedLen
      if (n.length < 0.0) return false
      return isSeed || keepTrackNote
    })
  }
  var midi = new Midi()
  midi.header.fromJSON(defaultMidiHeader({ bpm, name: seqName }))

  const notes = notesToToneNotes(storeNotes, bpm, false)
  const numTracks = _.max(notes.map(n => n.track)) + 1

  const tracks = _.range(numTracks).map((val) => {
    const track = midi.addTrack()
    track.fromJSON(defaultTrackHeader({ name: seqName }))
    return track
  })

  // const track = midi.addTrack()
  notes.forEach(n => {
    tracks[n.track].addNote(n)
  })
  return { midi, bpm, seqName }
}

export function storeToJSON (rootState, isSeed = true) {
  // create a new midi file
  const { nSteps, seedLen, durationTemp, noteTemp } = rootState.predict
  const { midi, bpm, seqName } = storeToMidi(rootState.sequence, (isSeed) ? seedLen : null)
  return { midi, nSteps, bpm, seqName, seedLen, durationTemp, noteTemp }
}
