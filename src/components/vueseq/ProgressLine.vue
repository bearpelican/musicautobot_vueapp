<template lang="pug">
  div#line(:style="{ left }" @mousedown="beginEditing")
    //- div#triangle-up()
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
import { positionToTiming } from '@/lib/positioning'
const { mapState, mapMutations } = createNamespacedHelpers('sequence')

export default {
  computed: {
    ...mapState(['progressTime', 'playOffset', 'appState']),
    left () {
      if (this.appState === 'editing') {
        return `${this.playOffset * pixelPerBeat}px`
      }
      return `${this.progressTime * pixelPerBeat}px`
    },
    scoreLeftOffset () {
      return this.$el.parentNode.parentNode.scrollLeft - this.$el.parentNode.parentNode.getBoundingClientRect().left
    },
    scrollTopOffset () {
      return this.$el.parentNode.parentNode.scrollLeft - this.$el.parentNode.parentNode.getBoundingClientRect().left
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
#line {
  position: absolute;
  top: 0;
  width: 2px;
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: #424242;
  height: 100%;
  cursor: move;
}
/*
#triangle-up {
  position: absolute;
  bottom: 0;
  left: -30px;
  width: 0;
  height: 0;

  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 30px solid #2986e2;
  cursor: move;
} */

</style>
