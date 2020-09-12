import { notesToToneNotes } from '@/lib/convert'
import { secondsToTiming, timingToSeconds } from '@/lib/positioning'
import { createPianoSynth } from '@/synth/pianoSynth'
import { createDefaultPolySynth } from '@/synth/defaultSynths'
import * as Tone from 'tone'
import _ from 'lodash'

export class SynthPlugin {
  constructor (store) {
    this.store = store
    this.notes = []
    this.synth = createPianoSynth()
    this.part = null
    this.currentPreview = null
    this.syncedEvents = []
    this.progress = null
    this.stopTimeout = null

    store.subscribe((mutation, state) => {
      switch (mutation.type.replace('sequence/', '')) {
        case 'updateInstrumentType': {
          this.updateInstrumentType(mutation.payload)
          break
        }
        case 'startPreview': {
          this.startPreview(mutation.payload)
          break
        }
        case 'finishPreview': {
          this.finishPreview()
          break
        }
        case 'play': {
          const notes = state.sequence.playbackVersion === 'original' ? state.sequence.origNotes : state.sequence.notes
          this.play(notes, state.sequence.bpm, state.sequence.playOffset)
          break
        }
        case 'stop': {
          this.stop()
          break
        }
        case 'updatePlayOffset': {
          const notes = state.sequence.playbackVersion === 'original' ? state.sequence.origNotes : state.sequence.notes
          this.playNotesOnBeat(notes, state.sequence.playOffset)
          break
        }
        default: {
          break
        }
      }
    })
  }

  stop () {
    this.reset()
    this.store.commit('sequence/finishMusic')
  }

  reset () {
    if (this.progress != null) {
      clearInterval(this.progress)
      this.progress = null
    }
    if (this.stopTimeout != null) {
      clearTimeout(this.stopTimeout)
      this.stopTimeout = null
    }
    Tone.Transport.stop()
    Tone.Transport.cancel(0)
    // Tone.Transport.cancel(0)
    // this.synth.unsync().sync()
    this.notes = []
  }

  updateInstrumentType ({ instrumentType }) {
    this.synth.unsync()
    if (instrumentType === 'synth') {
      this.synth = createDefaultPolySynth()
    } else {
      this.synth = createPianoSynth()
    }
  }

  startPreview ({ keyNumber, timeout }) {
    this.finishPreview()
    this.synth.triggerAttack(Tone.Midi(keyNumber))
    this.currentPreview = keyNumber
    if (_.isNumber(timeout)) {
      setTimeout(() => {
        this.finishPreview()
      }, (timeout) * 1000)
    }
  }

  finishPreview () {
    if (this.currentPreview != null) {
      this.synth.triggerRelease(Tone.Midi(this.currentPreview))
      this.currentPreview = null
    }
  }

  endTime (notes) {
    let maxTime = 0
    notes.forEach(note => {
      maxTime = Math.max(maxTime, note.duration + note.time)
    })
    return maxTime
  }

  play (notes, bpm, offset = 0) {
    // #### https://github.com/Tonejs/Midi/tree/219c7da527cb13c7f16b6769f93f2ba8fb5853d5 #####
    this.reset()
    this.notes = notesToToneNotes(notes, bpm)
    // make sure you set the tempo before you schedule the events
    Tone.Transport.bpm.value = bpm

    // pass in the note events from one of the tracks as the second argument to Tone.Part
    const midiPart = new Tone.Part((time, note) => {
      this.synth.triggerAttackRelease(Tone.Midi(note.midi), note.duration, time) //, note.velocity)
    }, this.notes)
    const offsetSeconds = timingToSeconds(offset, bpm)
    midiPart.start(0, `${offsetSeconds}`)
    // start the transport to hear the events
    if (Tone.Transport.state === 'stopped') {
      Tone.start()
      Tone.Transport.start()
    }

    this.progress = setInterval(() => {
      // const position = tonePositionToTiming(Tone.Transport.position)
      const time = secondsToTiming(Tone.Transport.seconds + offsetSeconds, bpm)
      this.store.commit('sequence/updateProgressTime', time)
    }, 5)

    this.stopTimeout = setTimeout(() => {
      this.stop()
    }, (this.endTime(this.notes) + 1 - offsetSeconds) * 1000)
  }

  playNotesOnBeat (notes, beat) {
    const midiNotes = notes.filter(n => {
      return (n.timing <= beat) && ((n.timing + n.length) > beat)
    }).map(note => Tone.Midi(note.key))
    this.synth.triggerAttackRelease(midiNotes, '1n', undefined, 0.1)
  }
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
  return new SynthPlugin(store)
}
