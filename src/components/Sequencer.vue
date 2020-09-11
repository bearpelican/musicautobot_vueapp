<template lang="pug">
  #sequencer
    #section(ref="scrollSection")
      keyboard
      score(:gridOpacity="gridOpacity")
    play-button(buttonID="play-button")
    <slot name="overlay"></slot>
</template>

<script>

import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import PlayButton from '@/components/controls/PlayButton'

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  name: 'Sequencer',
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
  },
  mounted () {
    this.scrollBottom()
  },
  methods: {
    scrollBottom () {
      const scrollSection = this.$refs.scrollSection
      scrollSection.scrollTop = scrollSection.scrollHeight
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
  /* overflow: hidden; */
  display: flex;
  overflow: auto;
  flex: 1;
}

#section {
  overflow-y: scroll;
  /* margin: 0px 100px; */
}

</style>

<style>

#play-button {
  position: absolute;
  bottom: 30px;
  left: 115px;
  z-index: 4;
}

</style>
