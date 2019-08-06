import { getLengthFromValue } from '@/lib/getNotes'

export const defaultLength = getLengthFromValue(1)
export const editingLength = getLengthFromValue(0.5)
export const pixelPerBeat = 50
export const keyHeight = 14
export const keyWidth = 70
export const defaultBeats = 40
export const startOctave = 2
export const endOctave = 7
export const scoreHeight = keyHeight * 12 * (endOctave - startOctave)
export const PredictionType = {
  next: {
    name: 'next',
    temp: [1.2, 0.8],
    track: -1,
    displayName: 'Autocomplete',
    description: 'Continue the song using the blue notes as a seed. Red notes are not used and will be overwritten'
  },
  melody: {
    name: 'melody',
    temp: [1.0, 0.8],
    track: 0,
    displayName: 'Melody',
    description: 'Create a new melody using the same chords.'
  },
  chords: {
    name: 'chords',
    temp: [0.7, 0.7],
    track: 1,
    displayName: 'Harmonize',
    description: 'Generate new chords from the same melody.'
  },
  notes: {
    name: 'notes',
    temp: [1.0, 0.0],
    track: -1,
    displayName: 'Notes',
    description: 'Create a new song in the exact same rhythm as the original.'
  },
  rhythm: {
    name: 'rhythm',
    temp: [0.5, 0.0],
    track: -1,
    displayName: 'Rhythm',
    description: 'Keep the same tune, but change the rhythm.'
  }
}
