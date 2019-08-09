<template lang="pug">
  div(:style="{ left, visibility }" @mousedown="beginEditing")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { positionToTiming } from '@/lib/positioning'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  props: { },
  data () {
    return { }
  },
  computed: {
    ...mapState(['maskEnd', 'predictionType']),
    left () {
      if (this.maskEnd === null) return '0px'
      return `${this.maskEnd * pixelPerBeat - 5}px`
    },
    hidden () {
      if (this.maskEnd === null) return true
      return ['pitch', 'beat'].includes(this.predictionType.name)
    },
    visibility () {
      return this.hidden ? 'hidden' : 'visible'
    }
  },
  methods: {
    ...mapMutations(['updateMaskEnd']),
    moveLine (event) {
      const quarterLength = 1
      const parentOffset = this.$el.parentNode.parentNode.getBoundingClientRect().left
      const newMaskEnd = positionToTiming((event.clientX - parentOffset), quarterLength)
      this.updateMaskEnd(newMaskEnd)
    },
    beginEditing (event) {
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
    finishEditing () {
      this.removeListeners()
    }
  }
}
</script>

<style scoped>
div {
  z-index: 3;
  position: absolute;
  top: 0;
  width: 8px;
  border-left-width: 6px;
  border-left-style: dotted;
  border-left-color: #1d1449be;
  height: 100%;
  cursor: move;
}
</style>
