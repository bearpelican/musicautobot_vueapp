import { getLengthFromValue } from '@/lib/getNotes'

export const defaultLength = getLengthFromValue(1)
export const editingLength = getLengthFromValue(0.5)
export const pixelPerBeat = 50
export const keyHeight = 14
export const defaultBeats = 40
export const startOctave = 2
export const endOctave = 6
export const PredictionType = {
  next: {
    name: 'next',
    temp: (1.2, 0.8),
    track: -1,
    displayName: 'Foward'
  },
  melody: {
    name: 'melody',
    temp: (1.0, 0.8),
    track: 0,
    displayName: 'Melody'
  },
  chords: {
    name: 'chords',
    temp: (0.7, 0.7),
    track: 1,
    displayName: 'Chords'
  },
  notes: {
    name: 'notes',
    temp: (1.0, 0.0),
    track: -1,
    displayName: 'Notes'
  },
  rhythm: {
    name: 'rhythm',
    temp: (0.5, 0.0),
    track: -1,
    displayName: 'Rhythm'
  }
}
