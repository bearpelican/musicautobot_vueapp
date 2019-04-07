<template lang="pug">
  div(:style="{ bottom, left, width, 'background-color': color }", @mousedown="startMoving")
    .selection.begin(@mousedown.stop="startEditingStartTime" :style="{ 'background-color': selectionColor }")
    .selection.end(@mousedown.stop="startEditingEndTime" :style="{ 'background-color': selectionColor }")
</template>

<script>
import { timingToPosition, positionToTiming, keyNumberToOffset } from '@/lib/positioning'
import { keyWidth } from '@/lib/config'
import validateNoteDetails from '@/lib/validateNoteDetails'
// import { emptyStatement } from 'babel-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  props: {
    index: Number,
    storeKeyNumber: Number,
    storeTiming: Number,
    storeLength: Number,
    scoreOffset: Number
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
      minimumUnit: state => state.currentLength.value
    }),
    ...mapState(['isEditingScore', 'progressTime', 'version']),
    bottom () {
      return `${keyNumberToOffset(this.keyNumber)}px`
    },
    left () {
      return `${timingToPosition(this.timing)}px`
    },
    width () {
      return `${timingToPosition(this.length)}px`
    },
    selectionColor () {
      if (this.length === 0) {
        console.log('Length:', this.length)
        return '#d32c2c'
      }
      return '#3287ce'
    },
    color () {
      if (this.timing < this.progressTime && (this.timing + this.length) > this.progressTime) {
        return '#000000'
      }
      return '#64b5f6'
    }
  },
  watch: {
    version () {
      this.reload()
    }
  },
  methods: {
    ...mapActions([
      'updateNoteLength',
      'updateNoteTiming',
      'updateNoteKeyNumber',
      'removeNote',
      'startPreview'
    ]),
    reload () {
      this.length = this.storeLength
      this.timing = this.storeTiming
      this.keyNumber = this.storeKeyNumber
    },
    addListeners () {
      window.addEventListener('mousemove', this.updateEditing)
      window.addEventListener('mouseup', this.finishEditing)
    },
    removeListeners () {
      window.removeEventListener('mousemove', this.updateEditing)
      window.removeEventListener('mouseup', this.finishEditing)
    },
    startMoving (event) {
      this.addListeners()
      this.state = 'moving'
      this.movingOffsetX = event.offsetX
      this.movingFirstY = event.clientY + this.getScrollTop()
    },
    startEditingEndTime () {
      this.addListeners()
      this.state = 'editing-end-time'
    },
    startEditingStartTime () {
      this.addListeners()
      this.state = 'editing-start-time'
    },
    updateEditing (event) {
      let nextTiming = this.timing
      let nextLength = this.length
      let nextKeyNumber = this.keyNumber
      // console.log('Event:', event)
      switch (this.state) {
        case 'editing-end-time': {
          nextLength = positionToTiming(
            event.clientX - this.scoreOffset + this.getScrollLeft(),
            this.minimumUnit
          ) - this.timing
          break
        }
        case 'moving': {
          nextTiming = positionToTiming(
            event.clientX - this.scoreOffset - this.movingOffsetX + this.getScrollLeft(),
            this.minimumUnit
          )
          nextKeyNumber = this.storeKeyNumber +
            Math.round((this.movingFirstY - (event.clientY + this.getScrollTop())) / keyWidth)
          // console.log('Next key number:', nextKeyNumber)
          if (this.keyNumber !== nextKeyNumber) {
            this.startPreview({ keyNumber: nextKeyNumber, timeout: 2 })
          }
          break
        }
        case 'editing-start-time': {
          nextTiming = positionToTiming(event.clientX - this.scoreOffset, this.minimumUnit)
          nextLength = this.storeLength + this.storeTiming - this.timing
          break
        }
      }
      if (validateNoteDetails(nextTiming, nextLength, nextKeyNumber)) {
        this.timing = nextTiming
        this.length = nextLength
        this.keyNumber = nextKeyNumber
      }
    },
    getScrollLeft () {
      return this.$el.parentNode.parentNode.scrollLeft
    },
    getScrollTop () {
      return this.$el.parentNode.parentNode.scrollTop
    },
    finishEditing () {
      this.removeListeners()
      if (this.length <= 0) {
        this.removeNote(this.index)
        return
      }
      this.state = 'normal'
      this.movingFirstY = 0
      this.movingOffsetX = 0
      if (this.storeLength !== this.length) {
        this.updateNoteLength({
          index: this.index,
          length: this.length
        })
      }
      if (this.storeTiming !== this.timing) {
        this.updateNoteTiming({
          index: this.index,
          timing: this.timing
        })
      }
      if (this.storeKeyNumber !== this.keyNumber) {
        this.updateNoteKeyNumber({
          index: this.index,
          keyNumber: this.keyNumber
        })
      }
    }
  }
}
</script>

<style scoped>
div {
  position: absolute;
  height: 14px;
  background-color: #64b5f6;
  border: 0.5px solid #42a5f5;
  cursor: move;
  z-index: 1;
}
.selection {
  position: absolute;
  width: 5px;
  height: 100%;
  background-color: #3287ce;
  border-color: #64b5f6;
}
.begin {
  cursor: w-resize;
  top: 0;
  left: 0;
}
.end {
  cursor: e-resize;
  top: 0;
  right: 0;
}
</style>
