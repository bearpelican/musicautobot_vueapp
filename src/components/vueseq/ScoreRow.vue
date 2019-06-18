<template lang="pug">
  div(:class="classes", @mousedown="add")
</template>

<script>
import { positionToTiming } from '@/lib/positioning'
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  props: {
    keyNumber: Number,
    keyType: String
  },
  computed: {
    ...mapState(['currentLength', 'appState', 'currentTrack']),
    classes () {
      return {
        'black-score': this.keyType === 'black',
        'white-score': this.keyType === 'white'
      }
    }
  },
  methods: {
    ...mapActions(['addNote', 'startEditingScore', 'finishEditingScore', 'startPreview']),
    add (event) {
      if (this.appState === 'playing') return
      this.startEditingScore()
      window.addEventListener('mouseup', this.end)
      const beatOffset = (pixelPerBeat / 2) // round the timing down when adding notes - otherwise it'll be a half step up
      this.addNote({
        key: this.keyNumber,
        timing: positionToTiming(event.offsetX - beatOffset, this.currentLength.value),
        length: this.currentLength.value,
        track: this.currentTrack
      })
      this.startPreview({ keyNumber: this.keyNumber, timeout: 2 })
    },
    end () {
      this.finishEditingScore()
      window.removeEventListener('mouseup', this.end)
    }
  }
}
</script>

<style scoped>
div {
  height: 14px;
  width: 100%;
  border: 1px solid #bbdefb;
  box-sizing: border-box;
}
.black-score {
  background-color: #e3f2fd;
}
.white-score {
  background-color: white;
}
</style>
