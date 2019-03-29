import Midi from '@tonejs/midi'
import { secondsToTiming, timingToSeconds } from '@/lib/positioning'
import _ from 'lodash'

export async function midiFileToNotes (midiFile) {
  // load a midi file in the browser
  const midi = await Midi.fromUrl(midiFile)
  return midiToNotes(midi)
}

export async function midiToNotes (midi) {
  // the file name decoded from the first track
  // const name = midi.name
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
  return { notes, bpm }
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
    .filter(n => n.time > 0)
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

export async function storeToMidi (state, seedLen = null) {
  // create a new midi file
  const bpm = state.sequence.bpm
  var midi = new Midi()
  // midi.header.tempos.push({ bpm: state.sequence.bpm })
  // add a track
  const track = midi.addTrack()
  let storeNotes = state.sequence.notes
  if (seedLen != null) {
    storeNotes = storeNotes.filter(n => n.timing <= seedLen)
  }
  console.log('Got store notes')
  console.log(storeNotes)
  let notes = notesToToneNotes(storeNotes, bpm, false)
  notes.forEach(n => {
    track.addNote(n)
  })
  console.log(notes[0])
  // track.addNote(notes[0])
  console.log('Woohoo added all notes')
  console.log(notes)
  console.log(track)
  // write the output
  return { midi, bpm }
  // fs.writeFileSync("output.mid", new Buffer(midi.toArray()))
}
