<template lang="pug">
  #sequencer
    #section(ref="scrollSection")
      keyboard
      score(:gridOpacity="gridOpacity")
    play-button(id="play-button")
    slot(name="overlay")
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
  },
  methods: {
    scrollBottom () {
      const scrollSection = this.$refs.scrollSection
      scrollSection.scrollTop = scrollSection.scrollHeight
    }
  },
  mounted () {
    this.scrollBottom()
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

#play-button {
  position: absolute;
  bottom: 30px;
  left: 215px;
  z-index: 4;
}
</style>
