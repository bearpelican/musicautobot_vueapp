import { startOctave, endOctave } from '@/lib/config'

export default function validateNoteDetails (timing, length, keyNumber) {
  return timing >= 0 &&
         //  length > 0 &&
         keyNumber >= (startOctave * 12) &&
         keyNumber <= ((endOctave + 1) * 12)
}
