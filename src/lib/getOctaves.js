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
  for (let i = 1; i < 8; i++) {
    octaves.push(...Object.keys(octave).map(pitch => {
      return pitch + i
    }))
  }
  return octaves
}

export const allKeys = [
  'A0', 'A#0', 'B0',
  ...generateOctaves()//,
//  "C8"
]

export function getKeyNumber (key) {
  const index = allKeys.indexOf(key)
  if (index === -1) {
    throw new Error(`The key (${key}) was not included.`)
  }
  return index + 1
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
