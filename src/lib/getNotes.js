const notes = [
  { label: 'whole', length: 4, font: 'A' },
  { label: 'half', length: 2, font: 'B' },
  { label: 'quater', length: 1, font: 'C' },
  { label: 'eighth', length: 0.5, font: 'D' },
  { label: 'sixteenth', length: 0.25, font: 'E' },
  { label: '32nd', length: 0.125, font: 'F' }
]

export default notes

export function getNoteFromLength (length) {
  for (let note of notes) {
    if (note.length === length) {
      return note
    }
  }
}
