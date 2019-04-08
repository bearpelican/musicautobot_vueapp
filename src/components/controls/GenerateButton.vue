<template lang="pug">
  v-btn(id="generate-button" :style="{ left }" color="red darken-2" dark fab @click="predictMidi")
    v-icon cached
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
      return `${this.seedLen * pixelPerBeat}px`
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
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%)
}
</style>
