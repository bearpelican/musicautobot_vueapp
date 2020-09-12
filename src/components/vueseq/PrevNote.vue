<template lang="pug">
  div(class="note-previous" :style="{ bottom, left, width, display }")
</template>

<script>
import { timingToPosition, keyNumberToOffset } from '@/lib/positioning'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  props: {
    index: { type: Number, required: true },
    storeKeyNumber: { type: Number, required: true },
    storeTiming: { type: Number, required: true },
    storeLength: { type: Number, required: true }
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
    ...mapState(['seedLen']),
    bottom () {
      return `${keyNumberToOffset(this.storeKeyNumber) + 2}px`
    },
    left () {
      return `${timingToPosition(this.storeTiming)}px`
    },
    width () {
      return `${timingToPosition(this.storeLength)}px`
    },
    display () {
      if (this._.round(this.storeTiming, 3) >= this.seedLen) {
        return 'block'
      }
      return 'none'
    }
  }
}
</script>

<style scoped>
.note-previous {
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
