import { startOctave, endOctave } from '@/lib/config'

export const octave = {
  C: 'white',
  'C#': 'black',
  D: 'white',
  'D#': 'black',
  E: 'white',
  F: 'white',
  'F#': 'black',
  G: 'white',
  'G#': 'black',
  A: 'white',
  'A#': 'black',
  B: 'white'
}

export function generateOctaves () {
  const octaves = []
  for (let i = startOctave; i < endOctave; i++) {
    octaves.push(...Object.keys(octave).map(pitch => {
      return pitch + i
    }))
  }
  return octaves
}

export const allKeys = [
  // 'A0', 'A#0', 'B0',
  ...generateOctaves()
]

export function getKeyNumber (key) {
  const keyOctave = parseInt(key.charAt(key.length - 1))
  const classidx = Object.keys(octave).indexOf(key.substring(0, key.length - 1))
  const midiNumber = (keyOctave + 1) * 12 + classidx
  return midiNumber
}

export function getTypeOfKey (key) {
  return octave[key.substring(0, key.length - 1)]
}

export function getKey (keyNumber) {
  const key = allKeys[keyNumber - 1]
  if (!key) {
    throw new Error(`The key of (${keyNumber}) was not found.`)
  }
  return key
}
