<template lang="pug">
  .draggable-line(:id="divID" :style="{ left, visibility }" @mousedown="beginEditing")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { positionToTiming } from '@/lib/positioning'

export default {
  props: { },
  data () {
    return {
      divID: 'draggable-line'
    }
  },
  computed: {
    offset () {
      return 0
    },
    beat: {
      set (beat) { /* implement */ },
      get () { /* implement */ return 0 }
    },
    left () {
      return `${this.beat * pixelPerBeat + this.offset}px`
    },
    hidden () {
      return false
    },
    visibility () {
      return this.hidden ? 'hidden' : 'visible'
    }
  },
  methods: {
    moveLine (event) {
      const quarterLength = 1
      const parentOffset = this.$el.parentNode.parentNode.getBoundingClientRect().left
      let newBeat = positionToTiming((event.clientX - parentOffset), quarterLength)
      if (newBeat < 0) {
        newBeat = 0
      }
      this.beat = newBeat
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

<style>
.draggable-line {
  z-index: 3;
  position: absolute;
  top: 0;
  width: 4px;
  /* border-right-width: 6px;
  border-right-style: dashed;
  border-right-color: #a35340; */
  height: 100%;
  cursor: move;
}
</style>
