import Midi from '@tonejs/midi'
import { secondsToTiming } from '@/lib/timing'
import _ from 'lodash'

export default async function midiToNotes (midiFile) {
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
      console.log(note.midi)
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
