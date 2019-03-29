<template lang="pug">
  div(:style="{ left, hidden }")
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  props: {
    index: Number
  },
  computed: {
    ...mapState(['seedLen', 'songItem']),
    left () {
      return `${this.seedLen * pixelPerBeat}px`
    },
    hidden () {
      return this._.isEmpty(this.songItem)
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  top: 0;
  width: 4px;
  border-left-width: 4px;
  border-left-style: dotted;
  border-left-color: #234325;
  height: 100%;
}
</style>
