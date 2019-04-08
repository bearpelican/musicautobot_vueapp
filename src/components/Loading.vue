
<template>
  <div>
    <v-progress-circular indeterminate color="green accent-3" :size="40"></v-progress-circular>
    <label>{{ value }}</label>
    <v-progress-circular indeterminate color="green accent-3" :size="40"></v-progress-circular>
  </div>
</template>

<script>
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  props: {
    value: String
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

<style lang='scss' scoped>
div {
  label {
    font-size: 2em;
    height: 100%;
    margin: 10px 20px;
  }

  .v-progress-circular {
    margin-bottom: 10px;
  }

  opacity: 0;
  // animation-delay: 1s;
  animation-duration: 1.0s;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

</style>
