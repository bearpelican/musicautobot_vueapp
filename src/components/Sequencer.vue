<template lang="pug">
  #sequencer
    section
      keyboard
      score(:gridOpacity="gridOpacity")
    play-button(id="play-button")
    slot
</template>

<script>

import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import PlayButton from '@/components/controls/PlayButton'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  name: 'sequencer',
  components: {
    Keyboard,
    Score,
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
