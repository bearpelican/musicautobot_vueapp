// import SynthBase from '@/synth/synthBase'
import Tone from 'tone'

// http://tonejs.github.io/Presets/

export function createSimpleSynth () {
  var synth = new Tone.Synth().toMaster()
  // debugSynth(synth)
  return synth
}

export function createPianoettaSynth () {
  const monoParams = {
    oscillator: {
      type: 'square'
    },
    filter: {
      Q: 2,
      type: 'lowpass',
      rolloff: -12
    },
    envelope: {
      attack: 0.005,
      decay: 3,
      sustain: 0,
      release: 0.45
    },
    filterEnvelope: {
      attack: 0.001,
      decay: 0.32,
      sustain: 0.9,
      release: 3,
      baseFrequency: 700,
      octaves: 2.3
    }
  }
  const monoWrap = (params) => new Tone.MonoSynth(params)
  return new Tone.PolySynth(6, monoWrap(monoParams)).toMaster()
}

export function createDefaultPolySynth () {
  return new Tone.PolySynth(6, Tone.MonoSynth).toMaster()
}
