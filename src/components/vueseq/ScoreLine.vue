<template lang="pug">
  div(:style="{ left }")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'

export default {
  props: {
    index: Number
  },
  computed: {
    left () {
      return `${this.index * pixelPerBeat}px`
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  top: 0;
  width: 1px;
  border-left: 1px solid black;
  height: 100%;
}
</style>
