<template lang="pug">
  #sequencer
    sequence-title
    section
      keyboard
      score
      button-container
    play-button(id="play-button")
</template>

<script>

import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import ButtonContainer from '@/components/controls/ButtonContainer'
import SequenceTitle from '@/components/vueseq/SequenceTitle'
import PlayButton from '@/components/controls/PlayButton'

export default {
  name: 'sequencer',
  components: {
    Keyboard,
    Score,
    ButtonContainer,
    SequenceTitle,
    PlayButton
  }
}
</script>

<style scoped>

@font-face {
  font-family: "notes";
  src: "@/assets/notes.woff";
}

#sequencer * {
  user-select: none;
  /* overflow: hidden; */
  /* position: relative; */
}
section {
  /* width: 80%;
  height: 50%; */
  margin: 0px 100px;
}

#play-button {
  position: absolute;
  bottom: 130px;
  left: 215px;
}

</style>
