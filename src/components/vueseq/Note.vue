<template lang="pug">
  .note(:style="{ bottom, left, width, height, opacity }", @mousedown="startMoving", @dblclick="remove")
    .note-color(:class="noteColor")
    .selection.begin(@mousedown.stop="startEditingStartTime" :class="noteColor")
    .selection.end(@mousedown.stop="startEditingEndTime" :class="noteColor")
</template>

<script>
import { timingToPosition, positionToTiming, keyNumberToOffset } from '@/lib/positioning'
import { keyHeight, editingLength } from '@/lib/config'
import validateNoteDetails from '@/lib/validateNoteDetails'
// import { emptyStatement } from 'babel-types'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')
const { mapState: predMapState } = createNamespacedHelpers('predict')

export default {
  props: {
    index: Number,
    track: Number,
    storeKeyNumber: Number,
    storeTiming: Number,
    storeLength: Number
  },
  data () {
    return {
      state: 'normal',
      height: `${keyHeight}px`,
      editLength: this.storeLength,
      editTiming: this.storeTiming,
      editKeyNumber: this.storeKeyNumber,
      movingOffsetX: 0,
      movingFirstY: 0
    }
  },
  computed: {
    ...mapState({
      minimumUnit: state => state.currentLength.value
    }),
    ...mapState(['progressTime', 'version', 'playbackVersion']),
    ...predMapState(['seedLen', 'predictionType']),
    bottom () {
      if (this.state === 'normal') return `${keyNumberToOffset(this.storeKeyNumber)}px`
      return `${keyNumberToOffset(this.editKeyNumber)}px`
    },
    left () {
      if (this.state === 'normal') return `${timingToPosition(this.storeTiming)}px`
      return `${timingToPosition(this.editTiming)}px`
    },
    width () {
      if (this.state === 'normal') return `${timingToPosition(this.storeLength)}px`
      return `${timingToPosition(this.editLength)}px`
    },
    // selectionColor () {
    //   if (this.editLength === 0) {
    //     return '#d32c2c'
    //   }
    //   const keepTrackNote = (this.predictionType.track !== -1) && (this.track !== this.predictionType.track)
    //   if (this.editTiming >= this.seedLen && !keepTrackNote) {
    //     return '#B71C1C'
    //   }
    //   return '#3287ce'
    // },
    // color () {
    //   if (this.editTiming < this.progressTime && (this.editTiming + this.editLength) > this.progressTime) {
    //     return '#666666'
    //   }
    //   const keepTrackNote = (this.predictionType.track !== -1) && (this.track !== this.predictionType.track)
    //   if (this.editTiming >= this.seedLen && !keepTrackNote) {
    //     return '#FF5252'
    //   }
    //   return '#64b5f6'
    // },
    opacity () {
      return this.playbackVersion === 'original' ? 0.2 : 0.8
    },
    noteColor () {
      if (this.storeTiming < this.progressTime && (this.storeTiming + this.storeLength) > this.progressTime) {
        return 'note-playing'
      }
      if (this.storeLength === 0) {
        return 'note-delete'
      }
      if (this.predictionType.name === 'rhythm') {
        return 'note-rhythm'
      }
      if (this.predictionType.name === 'notes') {
        return 'note-notes'
      }
      if (['melody', 'chords'].includes(this.predictionType.name) && (this.track !== this.predictionType.track)) {
        // Do not erase chords when predicting melody and visa versa
        return 'note-default'
      }
      if (this._.round(this.storeTiming, 3) >= this.seedLen) {
        return 'note-regen'
      }
      return 'note-default'
    },
    scoreLeftOffset () {
      return this.$el.parentNode.parentNode.scrollLeft - this.$el.parentNode.parentNode.getBoundingClientRect().left
    },
    scrollLeft () {
      return this.$el.parentNode.parentNode.scrollLeft
    },
    scrollTop () {
      return this.$el.parentNode.parentNode.scrollTop
    }
  },
  watch: {
    version () {
      this.reload()
    },
    state () {
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
      this.editLength = this.storeLength
      this.editTiming = this.storeTiming
      this.editKeyNumber = this.storeKeyNumber
    },
    remove () {
      this.removeNote(this.index)
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
      this.movingFirstY = event.clientY + this.scrollTop
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
      let nextTiming = this.editTiming
      let nextLength = this.editLength
      let nextKeyNumber = this.editKeyNumber
      switch (this.state) {
        case 'editing-end-time': {
          nextLength = positionToTiming(
            event.clientX + this.scoreLeftOffset,
            editingLength.value
          ) - this.editTiming
          break
        }
        case 'moving': {
          nextTiming = positionToTiming(
            event.clientX + this.scoreLeftOffset - this.movingOffsetX,
            editingLength.value
          )
          nextKeyNumber = this.storeKeyNumber +
            Math.round((this.movingFirstY - (event.clientY + this.scrollTop)) / keyHeight)
          if (this.editKeyNumber !== nextKeyNumber) {
            this.startPreview({ keyNumber: nextKeyNumber, timeout: 2 })
          }
          break
        }
        case 'editing-start-time': {
          nextTiming = positionToTiming(event.clientX + this.scoreLeftOffset, editingLength.value)
          nextLength = this.storeLength + this.storeTiming - nextTiming
          break
        }
      }
      if (validateNoteDetails(nextTiming, nextLength, nextKeyNumber)) {
        this.editTiming = nextTiming
        this.editLength = nextLength
        this.editKeyNumber = nextKeyNumber
      }
    },
    finishEditing () {
      this.removeListeners()
      if (this.editLength <= 0) {
        this.removeNote(this.index)
        return
      }
      this.state = 'normal'
      this.movingFirstY = 0
      this.movingOffsetX = 0
      if (this.storeLength !== this.editLength) {
        this.updateNoteLength({
          index: this.index,
          length: this.editLength
        })
      }
      if (this.storeTiming !== this.editTiming) {
        this.updateNoteTiming({
          index: this.index,
          timing: this.editTiming
        })
      }
      if (this.storeKeyNumber !== this.editKeyNumber) {
        this.updateNoteKeyNumber({
          index: this.index,
          keyNumber: this.editKeyNumber
        })
      }
    }
  }
}
</script>

<style scoped>
.note {
  position: absolute;
  /* border: 0.5px solid #42a5f5; */
  cursor: move;
  z-index: 1;
}
.selection {
  position: absolute;
  width: 4px;
  top: 0;
  height: 100%;
  filter: brightness(70%);
  /* Background clip to have a larger selection area, but smaller visual area */
  background-clip: padding-box;
}
.begin {
  cursor: w-resize;
  left: 0px;
  border-right: 2px solid transparent;
}
.end {
  cursor: e-resize;
  right: -1px;
  border-left: 2px solid transparent;
}
.note-color {
  width: 100%;
  height: 100%;
  /* opacity: 0.8; */
}
.note-playing {
  background-color: #666666;
}
.note-regen {
  background-color: #FF5252;
}
.note-delete {
  background-color: #d32c2c;
}
.note-default {
  background-color: #64b5f6;
}
.note-notes {
  background-color: #64b5f6;
}
.note-color.note-notes {
  border-width: 4px 0px 4px 0px;
  border-style: solid;
  border-color: #FF5252;
}

.note-rhythm {
  background-color: #64b5f6;
}

.note-color.note-rhythm {
  border-width: 0 8px 0 8px;
  border-style: solid;
  border-color: #FF5252;
}

</style>
