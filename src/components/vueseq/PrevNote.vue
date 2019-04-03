<template lang="pug">
  div(:style="{ bottom, left, width }")
</template>

<script>
import { timingToPosition, keyNumberToOffset } from '@/lib/positioning'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  props: {
    index: Number,
    storeKeyNumber: Number,
    storeTiming: Number,
    storeLength: Number
  },
  mounted () {
    if (this.isEditingScore) {
      this.length = this.minimumUnit
      this.startEditingEndTime()
    }
  },
  data () {
    return {
      state: 'normal',
      length: this.storeLength,
      timing: this.storeTiming,
      keyNumber: this.storeKeyNumber,
      movingOffsetX: 0,
      movingFirstY: 0
    }
  },
  computed: {
    ...mapState({
      minimumUnit: state => state.currentNote.length
    }),
    ...mapState(['isEditingScore']),
    bottom () {
      return `${keyNumberToOffset(this.keyNumber) + 2}px`
    },
    left () {
      return `${timingToPosition(this.timing)}px`
    },
    width () {
      return `${timingToPosition(this.length)}px`
    }
  },
  methods: {
    ...mapActions([
      'updateNoteLength',
      'updateNoteTiming',
      'updateNoteKeyNumber',
      'removeNote'
    ]),
    getScrollLeft () {
      return this.$el.parentNode.parentNode.scrollLeft
    },
    getScrollTop () {
      return this.$el.parentNode.parentNode.scrollTop
    }
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
