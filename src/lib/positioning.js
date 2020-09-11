import { keyHeight, pixelPerBeat, startOctave } from '@/lib/config'

// These are 3 units : timing, seconds, position
// Timing : the main units. It's the number of beats.
// Seconds : It's the number of seconds. Depends on BPM.
// Position : It's display position. Depends on pixelPerBeat.

export function positionToTiming (position, minimumUnit) {
  const timing = position / pixelPerBeat
  const surplus = timing % minimumUnit
  return timing - surplus + (surplus > minimumUnit / 2 ? minimumUnit : 0)
}

export function timingToPosition (timing) {
  return timing * pixelPerBeat
}

export function timingToSeconds (timing, bpm) {
  return timing * 60 / bpm
}

export function secondsToTiming (seconds, bpm) {
  return seconds * bpm / 60
}

export function tonePositionToTiming (position) {
  const comps = position.split(':').map(parseFloat)
  return comps[0] * 16 + comps[1] * 4 + comps[2]
}

export function timingToMS (timing, bpm) {
  return timing * 60 / bpm * 1000
}

export function keyNumberToOffset (keyNumber) {
  const octaveOffset = (startOctave + 1) * 12
  const keyOffset = (keyNumber)
  return (keyOffset - octaveOffset) * keyHeight
}
