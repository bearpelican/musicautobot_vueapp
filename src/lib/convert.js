import Midi from '@tonejs/midi'
import { secondsToTiming, timingToSeconds } from '@/lib/positioning'
import _ from 'lodash'
// import Tone from 'tone'

export async function midiToNotesTest (midiFile) {
  // load a midi file in the browser
  const midi = await Midi.fromUrl('./audio/sample/chorus_key_cmajor.mid')
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

export async function midiToNotes (midiFile) {
  // load a midi file in the browser
  const midi = await Midi.fromUrl(midiFile)
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

export function notesToToneNotes (notes, bpm) {
  let toneNotes = notes.sort((a, b) => {
    return a.timing - b.timing
  })
    .filter(note => {
      return note.timing > 0
    })
    .map(note => {
      return {
        midi: note.key,
        time: timingToSeconds(note.timing, bpm),
        duration: timingToSeconds(note.length, bpm),
        velocity: 0.8
      }
    })
  return toneNotes
}

export async function storeToMidi (state) {
  // create a new midi file
  var midi = new Midi()
  midi.header.tempos.push({ bpm: state.sequence.bpm })
  // add a track
  const track = midi.addTrack()
  let notes = notesToToneNotes(state.sequence.notes, state.sequence.bpm)

  notes.forEach(note => {
    track.addNote(note)
  })
  // write the output
  return midi
  // fs.writeFileSync("output.mid", new Buffer(midi.toArray()))
}
