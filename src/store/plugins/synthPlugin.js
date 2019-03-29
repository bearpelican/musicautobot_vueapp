import { notesToToneNotes } from '@/lib/convert'
import Tone from 'tone'

export class SynthPlugin {
  constructor (store) {
    this.store = store
    this.notes = []
    this.timeoutIds = []
    this.part = null
    this.synth = createPianoSynth()
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'startPreview': {
          this.startPreview(mutation.payload)
          break
        }
        case 'finishPreview': {
          this.finishPreview()
          break
        }
        case 'play': {
          this.play(state.sequence.notes, state.sequence.bpm)
          break
        }
        case 'stop': {
          this.stop()
        }
      }
    })
  }
  stop () {
    this.synth.stop()
    this.notes = []
    print('Stopped called')
    for (let timeoutId of this.timeoutIds) {
      clearTimeout(timeoutId)
    }
    this.timeoutIds = []
    this.store.commit('finishMusic')
  }
  startPreview (keyNumber) {
    this.synth.triggerAttackRelease(keyNumber, '4n', 0)
  }
  finishPreview () {
    this.synth.stop()
  }
  play (notes, bpm) {
    this.notes = notesToToneNotes(notes, bpm)
    this.notes.forEach(note => {
      this.synth.triggerAttackRelease(note.frequency, note.duration, note.time)
    })
  }
  next (currentSynth, index = 0) {
    if (index < this.notes.length) {
      const note = this.notes[index]
      currentSynth.play(note.frequency, note.length)
      if (index + 1 >= this.notes.length) {
        this.timeoutIds.push(setTimeout(this.stop, note.length, currentSynth))
        return
      }
      if (this.notes[index + 1].seconds === note.seconds) {
        this.next(currentSynth, index + 1)
      } else {
        this.timeoutIds.push(setTimeout(
          this.next,
          this.notes[index + 1].seconds - note.seconds,
          currentSynth,
          index + 1
        ))
      }
    }
  };
}

function createPianoSynth () {
  let audioContext = new AudioContext()
  Tone.setContext(audioContext)

  return new Tone.Sampler({
    'A0': 'A0.[mp3|ogg]',
    'C1': 'C1.[mp3|ogg]',
    'D#1': 'Ds1.[mp3|ogg]',
    'F#1': 'Fs1.[mp3|ogg]',
    'A1': 'A1.[mp3|ogg]',
    'C2': 'C2.[mp3|ogg]',
    'D#2': 'Ds2.[mp3|ogg]',
    'F#2': 'Fs2.[mp3|ogg]',
    'A2': 'A2.[mp3|ogg]',
    'C3': 'C3.[mp3|ogg]',
    'D#3': 'Ds3.[mp3|ogg]',
    'F#3': 'Fs3.[mp3|ogg]',
    'A3': 'A3.[mp3|ogg]',
    'C4': 'C4.[mp3|ogg]',
    'D#4': 'Ds4.[mp3|ogg]',
    'F#4': 'Fs4.[mp3|ogg]',
    'A4': 'A4.[mp3|ogg]',
    'C5': 'C5.[mp3|ogg]',
    'D#5': 'Ds5.[mp3|ogg]',
    'F#5': 'Fs5.[mp3|ogg]',
    'A5': 'A5.[mp3|ogg]',
    'C6': 'C6.[mp3|ogg]',
    'D#6': 'Ds6.[mp3|ogg]',
    'F#6': 'Fs6.[mp3|ogg]',
    'A6': 'A6.[mp3|ogg]',
    'C7': 'C7.[mp3|ogg]',
    'D#7': 'Ds7.[mp3|ogg]',
    'F#7': 'Fs7.[mp3|ogg]',
    'A7': 'A7.[mp3|ogg]',
    'C8': 'C8.[mp3|ogg]'
  }, () => { }, './audio/salamander/').toMaster()
}

// export default class SynthPlugin
export default function createSynthPlugin (store) {
  return new SynthPlugin(store)
}
