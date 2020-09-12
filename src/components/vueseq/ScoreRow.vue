<template lang="pug">
  .score-row(:class="classes", :style="{ height: height}", @click="handleClick")
</template>

<script>
import { positionToTiming } from '@/lib/positioning'
import { keyHeight, pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations, mapState } = createNamespacedHelpers('sequence')

export default {
  props: {
    keyNumber: { type: Number, required: true },
    keyType: { type: String, required: true }
  },
  data () {
    return {
      height: `${keyHeight}px`,
      clickCount: 0,
      clickTimer: null,
      delay: 250
    }
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
    ...mapMutations(['updatePlayOffset']),
    handleClick (event) {
      event.preventDefault()
      this.clickCount++
      if (this.clickCount === 1) {
        this.clickTimer = setTimeout(() => {
          this.clickCount = 0
          this.seek(event)
        }, this.delay)
      } else if (this.clickCount === 2) {
        clearTimeout(this.clickTimer)
        this.clickCount = 0
        this.add(event)
      }
    },
    add (event) {
      if (this.appState === 'playing') return
      const beatOffset = (pixelPerBeat / 2) // round the timing down when adding notes - otherwise it'll be a half step up
      this.addNote({
        key: this.keyNumber,
        timing: positionToTiming(event.offsetX - beatOffset, this.currentLength.value),
        length: this.currentLength.value,
        track: this.currentTrack
      })
      this.startPreview({ keyNumber: this.keyNumber, timeout: 2 })
    },
    seek (event) {
      // if (this.appState === 'playing') return
      // const beatOffset = (pixelPerBeat / 2) // round the timing down when adding notes - otherwise it'll be a half step up
      const position = positionToTiming(event.offsetX, this.currentLength.value)
      this.updatePlayOffset(position)
    }
  }
}
</script>

<style scoped>
.score-row {
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
