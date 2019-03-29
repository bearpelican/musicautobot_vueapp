import { notesToToneNotes } from '@/lib/convert'
import Tone from 'tone'

export class SynthPlugin {
  constructor (store) {
    this.store = store
    this.notes = []
    this.timeoutIds = []

    // this.audioContext = new AudioContext()
    // Tone.setContext(this.audioContext)

    // this.synth = createSimpleSynth()

    this.ts = new testSynth()
    this.ts.play(Tone.Midi(60), 4)
    // this.synth = createPianoSynth()
    store.subscribe((mutation, state) => {
      switch (mutation.type.replace('sequence/', '')) {
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
  // stop () {
  //   this.synth.stop()
  //   this.notes = []
  //   print('Stopped called')
  //   for (let timeoutId of this.timeoutIds) {
  //     clearTimeout(timeoutId)
  //   }
  //   this.timeoutIds = []
  //   this.store.commit('finishMusic')
  // }
  // startPreview (keyNumber) {
  //   this.synth.triggerAttackRelease(Tone.Midi(keyNumber), '4n', 0)
  // }
  // finishPreview () {
  //   this.synth.stop()
  // }
  play (notes, bpm) {
    this.notes = notesToToneNotes(notes, bpm)
    console.log(this.synth)
    // this.notes.forEach(note => {
    //   console.log(note)
    //   this.synth.triggerAttackRelease(Tone.Midi(note.midi), note.duration, note.time)
    // })

    // let ts = new testSynth()
    this.ts.play(Tone.Midi(60), 4)
    // debugSynth(this.synth)
  }
  // next (currentSynth, index = 0) {
  //   if (index < this.notes.length) {
  //     const note = this.notes[index]
  //     currentSynth.play(note.frequency, note.length)
  //     if (index + 1 >= this.notes.length) {
  //       this.timeoutIds.push(setTimeout(this.stop, note.length, currentSynth))
  //       return
  //     }
  //     if (this.notes[index + 1].seconds === note.seconds) {
  //       this.next(currentSynth, index + 1)
  //     } else {
  //       this.timeoutIds.push(setTimeout(
  //         this.next,
  //         this.notes[index + 1].seconds - note.seconds,
  //         currentSynth,
  //         index + 1
  //       ))
  //     }
  //   }
  // };
}

function createPianoSynth () {
  const synth = new Tone.Sampler({
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
  }, (synth) => {
    console.log(Tone.context)
    debugSynth(synth)
  }, './audio/salamander/').toMaster()
  return synth
}

function createSimpleSynth () {
  console.log('Creating simple synth')
  var synth = new Tone.Synth().toMaster()
  // debugSynth(synth)
  debugSynth(synth)
  // debugSynth(synth)
  return synth
}

export class Note {
  constructor (osc, frequency, time = null, onDestroyed = null) {
    this.osc = osc
    this.osc.frequency.value = frequency
    this.osc.start()
    if (time !== null) {
      setTimeout(() => {
        this.osc.stop()
        if (onDestroyed) {
          onDestroyed()
        }
      }, time)
    }
  }
}
class testSynth {
  constructor () {
    this.audioCtx = new AudioContext()
    // this.audioCtx = window.AudioContext
    this.gainNode = this.audioCtx.createGain()
    this.notes = []
    this.gainNode.gain.value = 0.1
    this.gainNode.connect(this.audioCtx.destination)
  }
  createOsc () {
    const osc = this.audioCtx.createOscillator()
    osc.connect(this.gainNode)
    osc.type = 'square'
    return osc
  }
  play (frequency, time = null) {
    let note
    if (time) {
      note = new Note(this.createOsc(), frequency, time, () => {
        this.notes.splice(this.notes.indexOf(note), 1)
      })
    } else {
      note = new Note(this.createOsc(), frequency)
    }
    this.notes.push(note)
  }
  stop () {
    for (let note of this.notes) {
      note.osc.stop()
    }
    this.notes = []
  }
}

function debugSynth (synth) {
  console.log('Synth loaded. JDSKLFSDJKLFSJKLD')
  console.log(synth)
  synth.triggerAttackRelease('C4', '4n', '8n')
  // synth.triggerAttack('C4', '4n', '8n')
  // synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
  // synth.triggerAttackRelease('G4', '16n', '2n')
  // synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
  // synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t') * 2)
  // synth.triggerAttackRelease('E4', '2n', '0:3')
  // Tone.Transport.start()
}

// export default class SynthPlugin
export default function createSynthPlugin (store) {
  console.log('Plugin installed:', store)
  return new SynthPlugin(store)
}
