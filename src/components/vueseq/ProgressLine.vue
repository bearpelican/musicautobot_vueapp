<template lang="pug">
  div(:style="{ left }")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('sequence')

export default {
  props: {
    index: Number
  },
  computed: {
    ...mapState(['progressTime']),
    left () {
      return `${this.progressTime * pixelPerBeat}px`
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
  border-left-color: rgb(173, 38, 67);
  height: 100%;
}
</style>
