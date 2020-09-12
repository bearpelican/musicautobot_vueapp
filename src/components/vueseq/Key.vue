<template lang="pug">
  button(
    :class="classes",
    :style="keyDimensions",
    @mousedown="mousedown"
  )
    | {{ caption }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { getKeyNumber } from '@/lib/getOctaves'
import { keyHeight, keyWidth } from '@/lib/config'
const { mapActions } = createNamespacedHelpers('sequence')

export default {
  props: {
    pitch: { type: String, required: true },
    keyType: { type: String, required: true },
    index: { type: Number, required: true }
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
    keyDimensions () {
      // 12 keys per octave, 7 white keys
      if (this.keyType === 'white') {
        return {
          height: (keyHeight * 12 / 7) + 'px',
          top: this.index * keyHeight + 'px',
          width: keyWidth + 'px'
        }
      }
      return {
        height: keyHeight + 'px',
        top: this.index * keyHeight + 'px',
        width: keyWidth - 20 + 'px'
      }
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
  font-size: 0.8em;
  padding-right: 3px;
  padding-top: 7px;
  outline: none;
}

.black-key {
  background-color: black;
  position: absolute;
}

.white-key {
  background-color: white;
}
</style>
