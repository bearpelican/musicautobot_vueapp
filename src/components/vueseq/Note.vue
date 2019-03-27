<template lang="pug">
  div(:style="{ bottom, left, width }", @mousedown="startMoving")
    .selection.begin(@mousedown.stop="startEditingStartTime")
    .selection.end(@mousedown.stop="startEditingEndTime")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { timingToPosition, positionToTiming } from '@/lib/timing'
import { keyWidth } from '@/lib/config'
import validateNoteDetails from '@/lib/validateNoteDetails'

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
      return `${(this.keyNumber - 1) * keyWidth}px`
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
      this.movingOffsetX = event.layerX
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
      switch (this.state) {
        case 'editing-end-time': {
          nextLength = positionToTiming(
            event.clientX - 100 + this.getScrollLeft(),
            this.minimumUnit
          ) - this.timing
          break
        }
        case 'moving': {
          nextTiming = positionToTiming(
            event.clientX - 100 - this.movingOffsetX + this.getScrollLeft(),
            this.minimumUnit
          )
          nextKeyNumber = this.storeKeyNumber +
            Math.round((this.movingFirstY - (event.clientY + this.getScrollTop())) / keyWidth)
          break
        }
        case 'editing-start-time': {
          nextTiming = positionToTiming(event.clientX - 100, this.minimumUnit)
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
  border: 2px solid #42a5f5;
  cursor: move;
  z-index: 1;
}
.selection {
  position: absolute;
  width: 5px;
  height: 100%;
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
