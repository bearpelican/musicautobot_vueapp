<template lang="pug">
  v-btn(id="generate-button" :style="{ left }" color="red darken-2" dark fab @click="predictMidi")
    v-icon shuffle
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('predict')

export default {
  props: {
    scoreOffset: Number
  },
  data () {
    return { }
  },
  computed: {
    ...mapState(['seedLen']),
    left () {
      return `${this.seedLen * pixelPerBeat - 32}px`
    }
  },
  methods: {
    ...mapActions(['predictMidi'])
  }
}
</script>

<style scoped>

#generate-button {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 4;
  /* top: 0;
  width: 8px;
  border-left-width: 8px;
  border-left-style: dotted;
  border-left-color: #234325;
  height: 100%;
  cursor: move; */
}
</style>
