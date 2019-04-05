
<template>
  <div>
    <!-- <b-spinner type="grow" label="Spinning"></b-spinner> -->
    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
    <b-spinner type="grow" label="Spinning"></b-spinner>
    <b-spinner type="grow" variant="primary" label="Spinning"></b-spinner>
    <label>{{ value }}</label>
    <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    <b-spinner type="grow" label="Spinning"></b-spinner>
    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
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
    margin: 0px 10px;
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
