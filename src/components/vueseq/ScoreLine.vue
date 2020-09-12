<template lang="pug">
  div(:style="{ left, 'border-left-color': borderColor }")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'

export default {
  props: {
    index: { type: Number, required: true }
  },
  computed: {
    left () {
      return `${this.index * pixelPerBeat}px`
    },
    borderColor () {
      return (this.index % 4 === 0) ? 'rgb(95, 95, 95)' : '#bbdefb'
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  top: 0;
  width: 1px;
  border-left-width: 1px;
  border-left-style: solid;
  border-left-color: rgb(95, 95, 95);
  height: 100%;
}
</style>
