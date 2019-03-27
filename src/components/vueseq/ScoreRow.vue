<template lang="pug">
  div(:class="classes", @mousedown="add")
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { positionToTiming } from '@/lib/timing'

export default {
  props: {
    keyNumber: Number,
    keyType: String
  },
  computed: {
    ...mapState(['currentNote', 'appState']),
    classes () {
      return {
        'black-score': this.keyType === 'black',
        'white-score': this.keyType === 'white'
      }
    }
  },
  methods: {
    ...mapActions(['addNote', 'startEditingScore', 'finishEditingScore']),
    add (event) {
      if (this.appState === 'playing') return
      this.startEditingScore()
      window.addEventListener('mouseup', this.end)
      this.addNote({
        key: this.keyNumber,
        timing: positionToTiming(event.offsetX, this.currentNote.length)
      })
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
