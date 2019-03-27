import { allKeys } from '@/lib/getOctaves'

export default function validateNoteDetails (timing, length, keyNumber) {
  return timing >= 0 &&
         length > 0 &&
         keyNumber >= 1 &&
         keyNumber <= allKeys.length
}
