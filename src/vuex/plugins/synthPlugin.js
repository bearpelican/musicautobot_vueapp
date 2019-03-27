import getFrequency from '@/lib/frequency'
import { timingToSeconds } from '@/lib/timing'
import Tone from 'tone'

export class SynthPlugin {
  constructor (store) {
    this.synth = null

    let audioContext = new AudioContext()
    Tone.setContext(audioContext)

    // this.synth = new Tone.Synth().toMaster()

    this.synth = new Tone.Sampler({
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

    this.store = store
    this.notes = []
    this.timeoutIds = []
    this.part = null
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'startPreview': {
          this.startPreview(this.synth, mutation.payload)
          break
        }
        case 'finishPreview': {
          this.finishPreview(this.synth)
          break
        }
        case 'play': {
          this.play(this.synth, state.notes, state.bpm)
          break
        }
        case 'stop': {
          this.stop(this.synth)
        }
      }
    })
  };
  stop (currentSynth) {
    currentSynth.stop()
    this.notes = []
    for (let timeoutId of this.timeoutIds) {
      clearTimeout(timeoutId)
    }
    this.timeoutIds = []
    this.store.commit('finishMusic')
  }
  startPreview (currentSynth, keyNumber) {
    currentSynth.play(getFrequency(keyNumber))
  }
  finishPreview (currentSynth) {
    currentSynth.stop()
  }
  play (currentSynth, notes, bpm) {
    // let audioContext = new AudioContext()
    // Tone.setContext(audioContext)

    // this.synth = new Tone.Synth().toMaster()

    // this.synth = new Tone.Sampler({
    //   'A0': 'A0.[mp3|ogg]',
    //   'C1': 'C1.[mp3|ogg]',
    //   'D#1': 'Ds1.[mp3|ogg]',
    //   'F#1': 'Fs1.[mp3|ogg]',
    //   'A1': 'A1.[mp3|ogg]',
    //   'C2': 'C2.[mp3|ogg]',
    //   'D#2': 'Ds2.[mp3|ogg]',
    //   'F#2': 'Fs2.[mp3|ogg]',
    //   'A2': 'A2.[mp3|ogg]',
    //   'C3': 'C3.[mp3|ogg]',
    //   'D#3': 'Ds3.[mp3|ogg]',
    //   'F#3': 'Fs3.[mp3|ogg]',
    //   'A3': 'A3.[mp3|ogg]',
    //   'C4': 'C4.[mp3|ogg]',
    //   'D#4': 'Ds4.[mp3|ogg]',
    //   'F#4': 'Fs4.[mp3|ogg]',
    //   'A4': 'A4.[mp3|ogg]',
    //   'C5': 'C5.[mp3|ogg]',
    //   'D#5': 'Ds5.[mp3|ogg]',
    //   'F#5': 'Fs5.[mp3|ogg]',
    //   'A5': 'A5.[mp3|ogg]',
    //   'C6': 'C6.[mp3|ogg]',
    //   'D#6': 'Ds6.[mp3|ogg]',
    //   'F#6': 'Fs6.[mp3|ogg]',
    //   'A6': 'A6.[mp3|ogg]',
    //   'C7': 'C7.[mp3|ogg]',
    //   'D#7': 'Ds7.[mp3|ogg]',
    //   'F#7': 'Fs7.[mp3|ogg]',
    //   'A7': 'A7.[mp3|ogg]',
    //   'C8': 'C8.[mp3|ogg]'
    // }, {
    //   'release': 1,
    //   'baseUrl': '@/assets/audio/salamander/'
    // }).toMaster()

    let synth = this.synth

    // synth.triggerAttackRelease('C4', '4n', '8n')
    // synth.triggerAttackRelease('E4', '8n', Tone.Time('4n') + Tone.Time('8n'))
    // synth.triggerAttackRelease('G4', '16n', '2n')
    // synth.triggerAttackRelease('B4', '16n', Tone.Time('2n') + Tone.Time('8t'))
    // synth.triggerAttackRelease('G4', '16', Tone.Time('2n') + Tone.Time('8t') * 2)
    // synth.triggerAttackRelease('E4', '2n', '0:3')

    this.notes = notes.sort((a, b) => {
      return a.timing - b.timing
    })
      .filter(note => {
        return note.timing > 0
      })
      .map(note => {
        return {
          frequency: getFrequency(note.key),
          midi: note.key,
          time: timingToSeconds(note.timing, bpm),
          duration: timingToSeconds(note.length, bpm),
          velocity: 0.8
        }
      })

    this.notes.forEach(note => {
      synth.triggerAttackRelease(note.frequency, note.duration, note.time)
    })
    // let triggerSynth(note)
    // Tone.Transport.schedule()

    // console.log('Playing...')
    // console.log(this.notes)

    // // this.part = new Tone.Part((time, value) => {
    // //   // the value is an object which contains both the note and the velocity
    // //   this.synth.triggerAttackRelease(value.midi, value.duration, time, value.velocity)
    // // }, this.notes)

    // // console.log(this.part)

    // // this.part.start(0)

    // //use an array of objects as long as the object has a "time" attribute
    // var part = new Tone.Part(function(time, note){
    //   //the notes given as the second element in the array
    //   //will be passed in as the second argument
    //   synth.triggerAttackRelease(note, "8n", time);
    // }, [[0, "C2"], ["0:2", "C3"], ["0:3:2", "G2"]]);
    // part.start()

    // Tone.Transport.start(); //the transport must be started
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

// export default class SynthPlugin
export default function createSynthPlugin (store) {
  return new SynthPlugin(store)
}
