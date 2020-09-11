const noteLengths = [
  { label: 'whole', value: 4, font: 'A' },
  { label: 'half', value: 2, font: 'B' },
  { label: 'quarter', value: 1, font: 'C' },
  { label: 'eighth', value: 0.5, font: 'D' },
  { label: 'sixteenth', value: 0.25, font: 'E' },
  { label: '32nd', value: 0.125, font: 'F' }
]

export default noteLengths

export function getLengthFromValue (value) {
  for (const noteLength of noteLengths) {
    if (noteLength.value === value) {
      return noteLength
    }
  }
}
