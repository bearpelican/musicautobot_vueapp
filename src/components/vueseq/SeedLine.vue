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
    ...mapState(['seedLen', 'predictionType']),
    left () {
      return `${this.seedLen * pixelPerBeat - 5}px`
    },
    hidden () {
      return ['notes', 'rhythm'].includes(this.predictionType.name)
    },
    visibility () {
      return this.hidden ? 'hidden' : 'visible'
    },
    scoreLeftOffset () {
      return this.$el.parentNode.parentNode.scrollLeft - this.$el.parentNode.parentNode.getBoundingClientRect().left
    }
  },
  methods: {
    ...mapMutations(['updateSeedLen']),
    moveLine (event) {
      const quarterLength = 1
      const newSeedLen = positionToTiming((event.clientX + this.scoreLeftOffset), quarterLength)
      this.updateSeedLen(newSeedLen)
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
  border-left-color: #4e2319be;
  height: 100%;
  cursor: move;
}
</style>
