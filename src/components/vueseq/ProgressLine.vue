<template lang="pug">
  div(:style="{ left }")
    div#triangle-right(@mousedown="beginEditing")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
import { positionToTiming } from '@/lib/positioning'
const { mapState, mapMutations } = createNamespacedHelpers('sequence')

export default {
  props: {
    scoreLeftOffset: Number
  },
  computed: {
    ...mapState(['progressTime', 'playOffset', 'appState']),
    left () {
      if (this.appState === 'editing') {
        return `${this.playOffset * pixelPerBeat}px`
      }
      return `${this.progressTime * pixelPerBeat}px`
    }
  },
  methods: {
    ...mapMutations(['updatePlayOffset']),
    moveLine (event) {
      if (this.appState !== 'editing') {
        return
      }
      const quarterLength = 1
      const playOffset = positionToTiming((event.clientX + this.scoreLeftOffset), quarterLength)
      this.updatePlayOffset(playOffset)
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
  position: absolute;
  top: 0;
  width: 2px;
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: #424242;
  height: 100%;
}

#triangle-right {
  top: 0;
  width: 0;
  height: 0;
  border-top: 20px solid transparent;
  border-left: 30px solid #2986e2;
  border-bottom: 20px solid transparent;
  cursor: move;
}

</style>
