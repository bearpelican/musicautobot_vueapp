<template lang="pug">
  <v-tooltip left v-model="showTooltip">
    <template v-slot:activator="{ on }">
      v-btn(id="generate-button" color="red darken-2" :style="{ left }"  dark large fab v-on="on" @click="predict")
        v-icon(id="generate-icon") cached
    </template>
    <div>Click to remix!</div>
  </v-tooltip>

</template>

<script>

import { keyWidth, pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
// import TutorialPredict from '@/components/TutorialPredict'
const { mapState, mapActions } = createNamespacedHelpers('predict')
const { mapState: seqMapState } = createNamespacedHelpers('sequence')

export default {
  // components: {
  //   TutorialPredict
  // },
  data () {
    return {
      parentNode: null,
      showTooltip: false
    }
  },
  computed: {
    ...mapState(['seedLen', 'maskStart', 'predictionType']),
    ...seqMapState(['scrollLeftPosition']),
    beat () {
      const ptype = this._.get(this.predictionType, 'name')
      return ['pitch', 'rhythm'].includes(ptype) ? this.maskStart : this.seedLen
    },
    left () {
      const offset = this.beat * pixelPerBeat
      const margin = 50
      let relativeOffset = offset - this.scrollLeftPosition + keyWidth

      let scoreWidth = 0
      if (this.parentNode !== null) {
        const parentRect = this.parentNode.getBoundingClientRect()
        scoreWidth = parentRect.right - parentRect.left
      }

      if (relativeOffset < margin + keyWidth) {
        relativeOffset = margin + keyWidth
      } else if (relativeOffset > scoreWidth - margin) {
        relativeOffset = scoreWidth - margin
      }
      return `${relativeOffset}px`
    }
  },
  mounted () {
    this.parentNode = this.$el.parentNode
    setTimeout(() => {
      this.showTooltip = true
      setTimeout(() => {
        this.showTooltip = false
      }, 8 * 1000)
    }, 1 * 1000)
  },
  methods: {
    ...mapActions(['predictMidi']),
    async predict () {
      this.showTooltip = false
      const pid = await this.predictMidi()
      if (pid) {
        this.$router.push({ path: `/predict/${pid}` })
      }
    }
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
