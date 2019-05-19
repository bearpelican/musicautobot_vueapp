<template lang="pug">
  .score(@scroll="onScroll" ref="scoreContainer")
    .inner(:style="{ width }")
      .grid(:style="{ opacity: gridOpacity }")
        score-row(
          v-for="(key, index) in keys",
          :key="index + '-key'",
          :keyNumber="key.number",
          :keyType="key.type"
        )
        note(
          v-for="(note, index) in notes",
          :key="index + '-note'",
          :index="index",
          :storeKeyNumber="note.key",
          :storeTiming="note.timing",
          :storeLength="note.length",
          :scoreLeftOffset="scoreLeftOffset"
        )
        prev-note(
          v-for="(note, index) in prevNotes",
          :key="index + '-prev-note'",
          :index="index",
          :storeKeyNumber="note.key",
          :storeTiming="note.timing",
          :storeLength="note.length"
        )
        score-line(
          v-for="(beat, index) in beats",
          :key="index + '-beat'",
          :index="index"
        )
      .grid-controls
        progress-line(
          key="progress-line",
          :scoreLeftOffset="scoreLeftOffset"
        )
        seed-line(
          key="seed-line",
          :scoreLeftOffset="scoreLeftOffset"
        )
    generate-button(
      :scoreScrollLeft="scoreScrollLeft",
      :scoreRect="scoreRect"
    )
</template>

<script>
import ScoreRow from '@/components/vueseq/ScoreRow'
import Note from '@/components/vueseq/Note'
import PrevNote from '@/components/vueseq/PrevNote'
import ScoreLine from '@/components/vueseq/ScoreLine'
import ProgressLine from '@/components/vueseq/ProgressLine'
import SeedLine from '@/components/vueseq/SeedLine'
import GenerateButton from '@/components/controls/GenerateButton'
import { allKeys, getTypeOfKey, getKeyNumber } from '@/lib/getOctaves'
import { defaultBeats, pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  components: {
    ScoreRow,
    PrevNote,
    Note,
    ScoreLine,
    ProgressLine,
    SeedLine,
    GenerateButton
  },

  props: {
    gridOpacity: Number
  },
  data () {
    return {
      keys: allKeys.map(key => {
        return {
          type: getTypeOfKey(key),
          number: getKeyNumber(key)
        }
      }).reverse(),
      scoreScrollTop: 0,
      scoreScrollLeft: 0,
      scoreRect: { left: 0, top: 0, right: 0, bottom: 0 }
    }
  },
  computed: {
    ...mapState(['notes', 'prevNotes']),
    beats () {
      /* eslint-disable no-console */
      return new Array(Math.max(
        defaultBeats,
        Math.ceil(this.notes.reduce((a, b) => {
          return {
            timing: Math.max(a.timing, b.timing)
          }
        }, { timing: 0 }).timing) + 16
      ))
    },
    width () {
      return `${this.beats.length * pixelPerBeat}px`
    },
    scoreLeftOffset () {
      return this.scoreScrollLeft - this.scoreRect.left
    },
    scoreTopOffset () {
      return this.scoreScrollTop - this.scoreRect.top
    }
  },
  mounted () {
    this.scoreRect = this.$el.getBoundingClientRect()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    ...mapActions(['scrollTop', 'scrollLeft']),
    onScroll () {
      this.scoreScrollLeft = this.$el.scrollLeft
      this.scoreScrollTop = this.$el.scrollTop
      this.scrollLeft(this.scoreScrollLeft)
      this.scrollTop(this.scoreScrollTop)
    },
    onResize () {
      this.scoreRect = this.$el.getBoundingClientRect()
    }
  }
}
</script>

<style scoped>

.score {
  flex: 1;
  height: 100%;
  overflow: scroll;
}

/*
For making scroll bar on top: https://stackoverflow.com/questions/18997724/how-to-change-scroll-bar-position-with-css
.score, .inner {
  transform:rotateX(180deg);
  -ms-transform:rotateX(180deg);
  -webkit-transform:rotateX(180deg);
} */

.inner {
  position: relative;

}
</style>
