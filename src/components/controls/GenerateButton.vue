<template lang="pug">
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      v-btn(id="generate-button" color="red darken-2" :style="{ left }"  dark fab v-on="on" @click="predict")
        v-icon(id="generate-icon") cached
    </template>
    <div>Click to remix!</div>
  </v-tooltip>

</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'

import TutorialPredict from '@/components/TutorialPredict'
const { mapState, mapActions } = createNamespacedHelpers('predict')

export default {
  props: {
    scoreScrollLeft: Number,
    scoreRect: {}
  },
  data () {
    return { }
  },
  computed: {
    ...mapState(['seedLen']),
    // left () {
    //   let leftOffset = this.seedLen * pixelPerBeat - this.scoreScrollLeft
    //   const margin = 50
    //   if (leftOffset < this.scoreRect.left + margin) {
    //     leftOffset = this.scoreRect.left + margin
    //   } else if (leftOffset > this.scoreRect.right - margin) {
    //     leftOffset = this.scoreRect.right - margin
    //   }
    //   return `${leftOffset}px`
    // }
    left () {
      let leftScoreOffset = this.seedLen * pixelPerBeat
      const margin = 50
      const relativeOffset = leftScoreOffset - this.scoreScrollLeft
      const scoreWidth = this.scoreRect.right - this.scoreRect.left
      if (relativeOffset < margin) {
        leftScoreOffset = this.scoreScrollLeft + margin
      } else if (relativeOffset > scoreWidth - margin) {
        leftScoreOffset = this.scoreScrollLeft - margin + scoreWidth
      }
      return `${leftScoreOffset}px`
    }
  },
  methods: {
    ...mapActions(['predictMidi']),
    async predict () {
      const pid = await this.predictMidi()
      if (pid) {
        this.$router.push({ path: `/predict/${pid}` })
      }
    }
  },
  components: {
    TutorialPredict
  }
}
</script>

<style scoped>

#generate-button {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 4;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  transition: none;
}

#generate-icon {
  animation:rotate 3s  infinite;
  animation-timing-function: cubic-bezier(1,0,.5,1);
  -webkit-animation:rotate 5s  infinite;
  -webkit-animation-timing-function: cubic-bezier(1,0,.5,1);
}

@-webkit-keyframes rotate {
  from { -webkit-transform: rotate(360deg) }
  to { -webkit-transform: rotate(0deg) }
}

</style>
