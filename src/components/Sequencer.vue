<template lang="pug">
  #sequencer
    sequence-title
    section
      keyboard
      score(:gridOpacity="gridOpacity")
    button-container
    play-button(id="play-button")
    slot
</template>

<script>

import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import ButtonContainer from '@/components/controls/ButtonContainer'
import SequenceTitle from '@/components/vueseq/SequenceTitle'
import PlayButton from '@/components/controls/PlayButton'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  name: 'sequencer',
  components: {
    Keyboard,
    Score,
    ButtonContainer,
    SequenceTitle,
    PlayButton
  },
  computed: {
    ...mapState(['tutorialStep']),
    gridOpacity () {
      return (this.tutorialStep !== 1) ? 1 : 0.4
    }
  }
}
</script>

<style scoped>

@font-face {
  font-family: "notes";
  src: "@/assets/notes.woff";
}

#sequencer {
  position: relative;
}
#sequencer * {
  user-select: none;
  /* overflow: hidden; */
}
section {
  /* width: 80%;
  height: 50%; */
  margin: 0px 100px;
}

#play-button {
  position: absolute;
  bottom: 10px;
  left: 215px;
  z-index: 4;
}
</style>
