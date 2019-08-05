<template lang="pug">
  div(class="note-original" :style="{ bottom, left, width, display, opacity }")
</template>

<script>
import { timingToPosition, keyNumberToOffset } from '@/lib/positioning'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')
const { mapState: seqMapState } = createNamespacedHelpers('sequence')

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
    ...mapState(['seedLen']),
    ...seqMapState(['playbackVersion']),
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
      if (this._.round(this.storeTiming, 3) >= this.seedLen || this.playbackVersion === 'original') {
        return 'block'
      }
      return 'none'
    },
    opacity () {
      return this.playbackVersion === 'original' ? 0.4 : 0.3
    }
  },
  methods: {
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
  z-index: 2;
  pointer-events: none;
  /* opacity: 0.2; */
  background: repeating-linear-gradient(
    45deg,
    #56c721,
    #54c021 10px,
    #7a1bb9 10px,
    #7a1bb9 20px
  );
}
</style>
