<template lang="pug">
  v-btn(id="generate-button" :style="{ left }" color="red darken-2" dark fab @click="predict")
    v-icon(id="generate-icon") cached
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
    ...mapActions(['predictMidi']),
    async predict () {
      const pid = await this.predictMidi()
      this.$router.push({ path: `/predict/${pid}` })
    }
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

#generate-icon {
  animation:rotate 3s  infinite;
  animation-timing-function: cubic-bezier(1,0,.5,1);
  -webkit-animation:rotate 5s  infinite;
  -webkit-animation-timing-function: cubic-bezier(1,0,.5,1);
}

@-webkit-keyframes rotate {
    from { -webkit-transform: rotate(360deg) }
    to { -webkit-transform: rotate(0deg) }
}

</style>
