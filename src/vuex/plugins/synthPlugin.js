import getFrequency from '@/lib/frequency'
import { timingToSeconds } from '@/lib/timing'

export class SynthPlugin {
  constructor (store) {
    this.store = store
    this.notes = []
    this.timeoutIds = []
    store.subscribe((mutation, state) => {
      switch (mutation.type) {
        case 'startPreview': {
          this.startPreview(state.currentSynth, mutation.payload)
          break
        }
        case 'finishPreview': {
          this.finishPreview(state.currentSynth)
          break
        }
        case 'play': {
          this.play(state.currentSynth, state.notes, state.bpm)
          break
        }
        case 'stop': {
          this.stop(state.currentSynth)
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
    this.notes = notes.sort((a, b) => {
      return a.timing - b.timing
    }).map(note => {
      return {
        frequency: getFrequency(note.key),
        seconds: timingToSeconds(note.timing, bpm),
        length: timingToSeconds(note.length, bpm)
      }
    })
    if (this.notes[0].timing === 0) {
      this.next(currentSynth)
    } else {
      this.timeoutIds.push(setTimeout(this.next, this.notes[0].seconds, currentSynth))
    }
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
