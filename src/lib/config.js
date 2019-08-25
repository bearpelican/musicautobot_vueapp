import { getLengthFromValue } from '@/lib/getNotes'
import _ from 'lodash'

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
    temp: [1.3, 0.8],
    filter: [24, 0.92],
    track: -1,
    displayName: 'Autocomplete',
    description: 'Builds a song using the blue notes. Red notes are overwritten'
  },
  melody: {
    name: 'melody',
    temp: [1.4, 1.0],
    filter: [24, 0.92],
    track: 0,
    displayName: 'Melody',
    description: 'Create a new melody using the same chords.'
  },
  chords: {
    name: 'chords',
    temp: [0.8, 0.8],
    filter: [12, 0.92],
    track: 1,
    displayName: 'Harmonize',
    description: 'Generate new chords from the same melody.'
  },
  pitch: {
    name: 'pitch',
    temp: [1.2, 0.0],
    filter: [24, 0.92],
    track: -1,
    displayName: 'Pitch',
    description: 'Create a new song in the exact same rhythm as the original.'
  },
  rhythm: {
    name: 'rhythm',
    temp: [0.0, 1.2],
    filter: [24, 0.92],
    track: -1,
    displayName: 'Rhythm',
    description: 'Keep the same tune, but remix the rhythm.'
  }
}

export function predictionTypeForName (name, ifnone = undefined) {
  // Legacy encoding
  if (name === 'notes') {
    return PredictionType.pitch
  }
  const defaultType = _.isEmpty(ifnone) ? PredictionType.next : ifnone
  return _.get(PredictionType, name, defaultType)
}
