import { getLengthFromValue } from '@/lib/getNotes'

export const defaultLength = getLengthFromValue(1)
export const editingLength = getLengthFromValue(0.5)
export const pixelPerBeat = 50
export const keyHeight = 14
export const defaultBeats = 40
export const startOctave = 2
export const endOctave = 8
export const scoreHeight = keyHeight * 12 * (endOctave - startOctave)
export const PredictionType = {
  next: {
    name: 'next',
    temp: [1.2, 0.8],
    track: -1,
    displayName: 'Generate',
    description: 'Default - new sequence will be to the right of the brown line. Blue notes are used as a sample. Red notes will be regenerated'
  },
  melody: {
    name: 'melody',
    temp: [1.0, 0.8],
    track: 0,
    displayName: 'Melody',
    description: 'Create a new melody from the same chords (in blue).'
  },
  chords: {
    name: 'chords',
    temp: [0.7, 0.7],
    track: 1,
    displayName: 'Chords',
    description: 'Harmonization - generate new chords from the melody.'
  },
  notes: {
    name: 'notes',
    temp: [1.0, 0.0],
    track: -1,
    displayName: 'Notes',
    description: 'Re-generate the notes of the song. Rhythm stays the same'
  },
  rhythm: {
    name: 'rhythm',
    temp: [0.5, 0.0],
    track: -1,
    displayName: 'Rhythm',
    description: 'Change the rhythm (note lengths) of the song. Note pitch statys the same'
  }
}

export const PresetSongs = [
  {
    s3id: '99c5db9ce936b7a1c5faab57cc3f160c',
    display: 'Call Me Maybe - Carly Rae Jepsen'
  },
  {
    s3id: '99c5db9ce936b7a1c5faab57cc3f160c',
    display: 'La Bamba'
  }
]
