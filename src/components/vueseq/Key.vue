<template lang="pug">
  button(
    :class="classes",
    :style="{ top, height }",
    @mousedown="mousedown"
  )
    | {{ caption }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { getKeyNumber } from '@/lib/getOctaves'
import { keyHeight } from '@/lib/config'
const { mapActions } = createNamespacedHelpers('sequence')

export default {
  props: {
    pitch: String,
    keyType: String,
    index: Number
  },
  computed: {
    classes () {
      return {
        'black-key': this.keyType === 'black',
        'white-key': this.keyType === 'white'
      }
    },
    caption () {
      return /C[0-9]/.test(this.pitch) ? this.pitch : ''
    },
    top () {
      return this.index * keyHeight + 'px'
    },
    height () {
      // 12 keys per octave, 7 white keys
      if (this.keyType === 'white') return (keyHeight * 12 / 7) + 'px'
      return keyHeight + 'px'
    }
  },
  methods: {
    ...mapActions(['startPreview', 'finishPreview']),
    mousedown () {
      window.addEventListener('mouseup', this.mouseup)
      this.startPreview({ keyNumber: getKeyNumber(this.pitch) })
    },
    mouseup () {
      window.removeEventListener('mouseup', this.mouseup)
      this.finishPreview()
    }
  }
}
</script>

<style scoped>

button {
  border: 1px solid black;
  display: block;
  text-align: right;
}

.black-key {
  width: 50px;
  background-color: black;
  position: absolute;
}

.white-key {
  background-color: white;
  width: 100px;
}
</style>
