<template lang="pug">
  button(
    :class="classes",
    :style="{ top: index * 14 + 'px' }",
    @mousedown="mousedown"
  )
    | {{ caption }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { getKeyNumber } from '@/lib/getOctaves'
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
/* key-width: 16px */
/* white-key: key-width + 8px */
button {
  border: 1px solid black;
  display: block;
  text-align: right;
}

.black-key {
  width: 70px;
  height: 14px;
  background-color: black;
  position: absolute;
}

.white-key {
  background-color: white;
  width: 100px;
  height: 24px;
}
</style>
