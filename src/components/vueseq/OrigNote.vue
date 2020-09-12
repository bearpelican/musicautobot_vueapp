<template lang="pug">
  div(class="note-original" :style="{ bottom, left, width, display, opacity, filter }")
</template>

<script>
import { timingToPosition, keyNumberToOffset } from '@/lib/positioning'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')
const { mapState: seqMapState } = createNamespacedHelpers('sequence')

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
    ...seqMapState(['playbackVersion', 'appState', 'progressTime']),
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
      return 'block' // Always showing for now
      // if (this._.round(this.storeTiming, 3) >= this.seedLen || this.playbackVersion === 'original') {
      //   return 'block'
      // }
      // return 'none'
    },
    filter () {
      if (this.appState === 'playing') { // Follow along with progress line
        const timing = this._.round(this.storeTiming, 3)
        const isPlaying = timing < this.progressTime && (timing + this.storeLength) > this.progressTime
        if (isPlaying && this.playbackVersion === 'original') {
          return 'brightness(50%)'
        }
      }
      return 'none'
    },
    opacity () {
      return this.playbackVersion === 'original' ? 0.8 : 0.3
    }
  }
}
</script>

<style scoped>
.note-original {
  position: absolute;
  height: 10px;
  /* background-color: #94ffbd; */
  /* border: 2px solid #dbdcdd; */
  /* cursor: move; */
  z-index: 0;
  pointer-events: none;
  /* opacity: 0.2; */
  background: repeating-linear-gradient(
    45deg,
    #56c721,
    #54c021 10px,
    #fffeb0 10px,
    #fffeb0 20px
  );
}
</style>
