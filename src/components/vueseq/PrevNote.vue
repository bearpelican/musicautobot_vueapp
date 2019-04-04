<template lang="pug">
  div(:style="{ bottom, left, width }")
</template>

<script>
import { timingToPosition, keyNumberToOffset } from '@/lib/positioning'

export default {
  props: {
    index: Number,
    storeKeyNumber: Number,
    storeTiming: Number,
    storeLength: Number
  },
  mounted () {
  },
  data () {
    return {
      state: 'normal',
      length: this.storeLength,
      timing: this.storeTiming,
      keyNumber: this.storeKeyNumber
    }
  },
  computed: {
    bottom () {
      return `${keyNumberToOffset(this.storeKeyNumber) + 2}px`
    },
    left () {
      return `${timingToPosition(this.storeTiming)}px`
    },
    width () {
      return `${timingToPosition(this.storeLength)}px`
    }
  },
  methods: {
  }
}
</script>

<style scoped>
div {
  position: absolute;
  height: 10px;
  /* background-color: #94ffbd; */
  /* border: 2px solid #dbdcdd; */
  /* cursor: move; */
  z-index: 2;
  pointer-events: none;
  opacity: 0.2;
  background: repeating-linear-gradient(
    45deg,
    #52803d,
    #52803d 10px,
    #72b3c4 10px,
    #72b3c4 20px
  );
}
</style>
