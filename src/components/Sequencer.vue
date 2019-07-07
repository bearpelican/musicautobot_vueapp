<template lang="pug">
  #sequencer
    section
      keyboard
      score(:gridOpacity="gridOpacity")
        template(v-slot:scroll-content="contentProps")
          seed-line(
            key="seed-line",
            :scoreLeftOffset="contentProps.scoreLeftOffset"
          )
          generate-button(
            :scoreScrollLeft="contentProps.scoreScrollLeft",
            :scoreRect="contentProps.scoreRect"
          )
    play-button(id="play-button")
</template>

<script>

import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import PlayButton from '@/components/controls/PlayButton'
import SeedLine from '@/components/vueseq/SeedLine'
import GenerateButton from '@/components/controls/GenerateButton'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  name: 'sequencer',
  components: {
    Keyboard,
    Score,
    PlayButton,
    SeedLine,
    GenerateButton
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
