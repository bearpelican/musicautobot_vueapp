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
    description: 'Uses the blue notes to continue the song. Red notes will be overwritten'
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
    description: 'Create a new song with the exact same rhythm.'
  },
  rhythm: {
    name: 'rhythm',
    temp: [0.5, 0.0],
    track: -1,
    displayName: 'Rhythm',
    description: 'Keep the notes, but change the rhythm.'
  }
}

export const PresetSongs = [
  {
    sid: '99c5db9ce936b7a1c5faab57cc3f160c',
    display: 'Call Me Maybe - Carly Rae Jepsen',
    seedLen: 10
  },
  {
    sid: 'aeee134e4034e5f98bb630c56d2f7f8c',
    display: 'La Bamba - Ritchie Valen',
    seedLen: 13
  },
  {
    sid: 'b4c62f3d11f448db69c4fa15e27e9e8e',
    display: 'Can You Feel The Love Tonight - Elton John',
    seedLen: 14
  },
  {
    sid: '8f10995e036c5f590ca616dee0c9c7d7',
    display: 'Colors Of The Wind - Disney',
    seedLen: 20
  },
  {
    sid: '58890c433f173ba77220274017b8af92',
    display: 'A Thousand Miles - Vanessa Carlton',
    seedLen: 12
  },
  {
    sid: '19762ebd7059dd5f8809f98b2575d8c1',
    display: 'Levels - Avicii',
    seedLen: 12
  },
  {
    sid: 'c4d9e72a92f931b2c72e84b6efee4b51',
    display: 'Canon In D Major - Johann Pachelbel',
    seedLen: 12
  },
  {
    sid: 'de1fa62a9c209491d4fd81f1d1ceb55e',
    display: 'In The Hall Of the Mountain King - Edvard Grieg',
    seedLen: 12
  },
  {
    sid: 'f8b65d3624d9a68e417792ec27de9296',
    display: 'Scary Monsters And Nice Sprites - Skrillex'
  },
  {
    sid: '2ad86f3ecd71b058eac9cc5ceba11db8',
    display: 'I Want You Back - Jackson 5',
    seedLen: 28
  },
  {
    sid: '999e8169b01f59fa28e63b142f35feda',
    display: 'All I Want For Christmas Is You - Mariah Carey',
    seedLen: 12
  },
  {
    sid: '7f0f162d111f880cf77ff9bed15acd5d',
    display: 'Middle - Zedd',
    seedLen: 9
  },
  {
    sid: '077b40997776b84366ee18056948ae38',
    display: 'Locked Out Of Heaven - Bruno Mars',
    seedLen: 20
  },
  {
    sid: '065b1c94fe8545bbe8eeec2f1bf4efa2',
    display: 'Just Give Me A Reason - Pink',
    seedLen: 16
  },
  {
    sid: 'f2062929514d3084f73a1ad81bbbe01f',
    display: 'Let It Go - Idina Menzel',
    seedLen: 20
  },
  {
    sid: '68ce7fc929f395291507cc47510cd82c',
    display: 'Where Is The Love - Black Eyed Peas',
    seedLen: 12
  },
  {
    sid: '6ae7e284e78824ee4c17dc6e6bda361c',
    display: 'Fuer Elise - Ludwig Van Beethoven',
    seedLen: 14
  },
  {
    sid: '73b2b8e7db746b7e4b6fc3fa4658671b',
    display: 'The Four Seasons Concert No 4 Winter - Antonio Vivaldi',
    seedLen: 15

  }
]
