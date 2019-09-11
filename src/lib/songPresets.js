export const Presets = [
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
  },
  {
    sid: 'b51d911631b67babe1612dae455600e3',
    display: 'In The End - Linkin Park - Chorus',
    seedLen: 15
  },
  {
    sid: '81efc618ff11aa17d4e96219380c115e',
    display: 'Hey Jude - The Beatles - Chorus',
    seedLen: 15
  },
  {
    sid: '583aee3ac9d91125102096d28926702b',
    display: 'Oops I Did It Again - Britney Spears - Chorus',
    seedLen: 13
  },
  {
    sid: 'e250d1faf9b3265f23c049d113f8a773',
    display: 'Legend Of Zelda Main Theme - Nintendo',
    seedLen: 10
  },
  {
    sid: 'e8820e3b81d2429d684c986ce2f57071',
    display: 'I Dont Want To Miss A Thing - Aerosmith - Chorus',
    seedLen: 15
  },
  {
    sid: '83ee71fe7fef0bd1fd15a49740cfc967',
    display: 'Everywhere - Michelle Branch - Chorus'
  },
  {
    sid: '1b341ae44d35a6c8d21f6ba3af65dd97',
    display: 'I Kissed A Girl - Katy Perry - Chorus'
  },
  {
    sid: '4296f489066d02db3491bcde78667746',
    display: 'Symphony No 40 In G Minor I - Wolfgang Amadeus Mozart - Verse', // ERROR
    seedLen: 22
  },
  {
    sid: '8c0b6ff7e893dca13edd90a4d9ebb892',
    display: 'Stairway To Heaven - Led Zeppelin - Intro'
  },
  {
    sid: 'c8bcf08c8d31c98c61a91b2d90a9cdde',
    display: 'Complicated - Avril Lavigne - Chorus',
    seedLen: 15
  },
  {
    sid: '50b4cbff1b6c2886c31332e5fb1a5f56',
    display: 'Stronger - Kanye West - Chorus',
    seedLen: 15
  },
  {
    sid: 'bb3324a9068db739eff1b2fc1cc0670b',
    display: 'Bad Romance - Lady Gaga - Chorus',
    seedLen: 12
  }
]

export function shuffleSong () {
  return Presets[Math.floor(Math.random() * Presets.length)]
}
