<template lang="pug">
  div(:class="classes", @mousedown="add")
</template>

<script>
import { positionToTiming } from '@/lib/positioning'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  props: {
    keyNumber: Number,
    keyType: String
  },
  computed: {
    ...mapState(['currentLength', 'appState']),
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
      this.addNote({
        key: this.keyNumber,
        timing: positionToTiming(event.offsetX, this.currentLength.value),
        length: this.currentLength.value
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
