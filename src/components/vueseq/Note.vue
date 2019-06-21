<template lang="pug">
  //- div.note(:style="{ bottom, left, width, 'background-color': color }", @mousedown="startMoving")
  .note(:style="{ bottom, left, width, height }", @mousedown="startMoving")
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
    storeLength: Number,
    scoreLeftOffset: Number
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
      height: `${keyHeight}px`,
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
    ...mapState(['isEditingScore', 'progressTime', 'version', 'currentTrack']),
    ...predMapState(['seedLen', 'predictionType']),
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
        return '#d32c2c'
      }
      const keepTrackNote = (this.predictionType.track !== -1) && (this.track !== this.predictionType.track)
      if (this.timing >= this.seedLen && !keepTrackNote) {
        return '#B71C1C'
      }
      return '#3287ce'
    },
    color () {
      if (this.timing < this.progressTime && (this.timing + this.length) > this.progressTime) {
        return '#666666'
      }
      const keepTrackNote = (this.predictionType.track !== -1) && (this.track !== this.predictionType.track)
      if (this.timing >= this.seedLen && !keepTrackNote) {
        return '#FF5252'
      }
      return '#64b5f6'
    },
    noteColor () {
      if (this.timing < this.progressTime && (this.timing + this.length) > this.progressTime) {
        return 'note-playing'
      }
      if (this.length === 0) {
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
      if (this.timing >= this.seedLen) {
        return 'note-regen'
      }
      return 'note-default'
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
            event.clientX + this.scoreLeftOffset,
            editingLength.value
          ) - this.timing
          break
        }
        case 'moving': {
          nextTiming = positionToTiming(
            event.clientX + this.scoreLeftOffset - this.movingOffsetX,
            editingLength.value
          )
          nextKeyNumber = this.storeKeyNumber +
            Math.round((this.movingFirstY - (event.clientY + this.getScrollTop())) / keyHeight)
          // console.log('Next key number:', nextKeyNumber)
          if (this.keyNumber !== nextKeyNumber) {
            this.startPreview({ keyNumber: nextKeyNumber, timeout: 2 })
          }
          break
        }
        case 'editing-start-time': {
          nextTiming = positionToTiming(event.clientX + this.scoreLeftOffset, editingLength.value)
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
.note {
  position: absolute;
  /* border: 0.5px solid #42a5f5; */
  cursor: move;
  z-index: 1;
}
.selection {
  position: absolute;
  width: 5px;
  height: 100%;
  filter: brightness(70%);
  /* Background clip to have a larger selection area, but smaller visual area */
  background-clip: padding-box;
}
.begin {
  cursor: w-resize;
  top: 0;
  left: 0;
  border: none;
  border-right: 3px solid transparent;
}
.end {
  cursor: e-resize;
  top: 0;
  right: 0;
  border: none;
  border-left: 3px solid transparent;
}
.note-color {
  width: 100%;
  height: 100%;
  opacity: 0.8;
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
