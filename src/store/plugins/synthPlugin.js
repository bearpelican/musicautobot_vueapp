import { notesToToneNotes } from '@/lib/convert'
import Tone from 'tone'

export class SynthPlugin {
  constructor (store) {
    this.store = store
    this.notes = []
    this.audioContext = new AudioContext()
    Tone.setContext(this.audioContext)
    this.synth = createPianoSynth()
    this.part = null
    this.currentPreview = null
    this.syncedEvents = []

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
          // this.playPart(state.sequence.notes, state.sequence.bpm)
          this.playTransport(state.sequence.notes, state.sequence.bpm)
          break
        }
        case 'stop': {
          this.stop()
          break
        }
        default: {
          break
        }
      }
    })
  }
  stop () {
    Tone.Transport.stop()
    Tone.Transport.cancel(0)
    // Tone.Transport.cancel(0)
    // this.synth.unsync().sync()
    this.notes = []
    this.store.commit('sequence/finishMusic')
  }
  startPreview (keyNumber) {
    this.finishPreview()
    this.synth.triggerAttack(Tone.Midi(keyNumber))
    this.currentPreview = keyNumber
  }
  finishPreview () {
    if (this.currentPreview != null) {
      this.synth.triggerRelease(Tone.Midi(this.currentPreview))
      this.currentPreview = null
    }
  }
  play (notes, bpm) {
    this.notes = notesToToneNotes(notes, bpm)
    const now = Tone.now() + 0.5
    this.notes.forEach(note => {
      this.synth.triggerAttackRelease(Tone.Midi(note.midi), note.duration, now + note.time)
    })
  }
  // playPart (notes, bpm) {
  //   this.notes = notesToToneNotes(notes, bpm)
  //   this.part = new Tone.Part((time, value) => {
  //     // the value is an object which contains both the note and the velocity
  //     this.synth.triggerAttackRelease(value.note, value.duration, time, value.velocity)
  //   }, this.notes)
  //   this.part.loop = true
  //   this.part.loopEnd = 10
  //   this.part.start(0)
  //   this.part.start()
  //   Tone.Transport.start(0)
  //   Tone.Transport.start()
  //   // this.notes.forEach(note => {
  //   //   this.synth.triggerAttackRelease(Tone.Midi(note.midi), note.duration, now + note.time)
  //   // })
  // }
  playTransport (notes, bpm) {
    this.notes = notesToToneNotes(notes, bpm)

    this.notes.forEach(note => {
      Tone.Transport.schedule((time) => {
        this.synth.triggerAttackRelease(Tone.Midi(note.midi), note.duration)
      }, note.time)
    })
    Tone.Transport.start()

    // bind the transport
    this.bind()
    // Tone.Transport.bind('position', () => {
    //   console.log('Position changed')
    // })
    // Object.observe(Tone.Transport, () => {
    // console.log('hjfkdslfjdslf')
    // })
    // .addEventListener('position', e => {
    //   console.log('dsjfklsdjfkldsjfsdklfjsdklfj')
    // })
    // this.addEventListener('position', e)
    // document.querySelector("tone-play-toggle").bind(Tone.Transport);
    // document.querySelector("tone-position").bind(Tone.Transport);
    // document.querySelector("tone-position").addEventListener("position", e => {
    // 	document.querySelector("#progress").style = `left: ${e.detail*100}%`;
    // });
  }
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
    // console.log('sdjfklsdjfslkdjf')
    // debugSynth2(synth)
  }, './audio/salamander/').toMaster()
  return synth
}

// function createSimpleSynth () {
//   var synth = new Tone.Synth().toMaster()
//   // debugSynth(synth)
//   return synth
// }

// function debugSynth2 (synth) {
//   console.log(synth)
//   s = synth
//   var part = new Tone.Part(function(time, value){
//     //the value is an object which contains both the note and the velocity
//     s.triggerAttackRelease(value.note, "8n", time, value.velocity);
//   }, [{"time" : 0, "note" : "C3", "velocity": 0.9},
//        {"time" : "0:2", "note" : "C4", "velocity": 0.5}
//   ])
//   part.loop = true
//   part.start(0)
//   part.start()

//   Tone.Transport.loopStart = 0;
//   Tone.Transport.loopEnd = "1:0";
//   Tone.Transport.loop = true;

//   Tone.Transport.start(0)
//   Tone.Transport.start()
// }
// function debugSynth (synth) {
//   const now = Tone.now() + 0.5
//   synth.triggerAttackRelease('C4', 0.5, now + 0)
//   synth.triggerAttackRelease('E4', 0.5, now + 1)
//   synth.triggerAttackRelease('G4', 0.5, now + 2)
//   synth.triggerAttackRelease('B4', 0.5, now + 3)
// }

// export default class SynthPlugin
export default function createSynthPlugin (store) {
  console.log('Plugin installed:', store)
  return new SynthPlugin(store)
}
