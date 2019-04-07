<template lang="pug">
  div(:style="{ left, hidden }" @mousedown="beginEditing")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  props: {
    index: Number
  },
  computed: {
    ...mapState(['seedLen', 'songItem']),
    left () {
      return `${this.seedLen * pixelPerBeat - 8}px`
    },
    hidden () {
      return this._.isEmpty(this.songItem)
    }
  },
  methods: {
    ...mapMutations(['updateSeedLen']),
    moveLine (event) {
      console.log(parseInt(event.layerX / pixelPerBeat))
      // this.updateSeedLen()
      // this.addListeners()
    },
    beginEditing (event) {
      console.log(parseInt(event.layerX / pixelPerBeat))
      this.addListeners()
    },
    addListeners () {
      window.addEventListener('mousemove', this.moveLine)
      window.addEventListener('mouseup', this.finishEditing)
    },
    removeListeners () {
      window.removeEventListener('mousemove', this.moveLine)
      window.removeEventListener('mouseup', this.finishEditing)
    },
    // startMoving (event) {
    //   this.addListeners()
    //   this.movingOffsetX = event.layerX
    //   this.movingFirstY = event.clientY + this.getScrollTop()
    // },
    finishEditing () {
      this.removeListeners()
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  top: 0;
  width: 8px;
  border-left-width: 8px;
  border-left-style: dotted;
  border-left-color: #234325;
  height: 100%;
}
</style>
