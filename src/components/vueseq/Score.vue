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
          :track="note.track",
          :storeKeyNumber="note.key",
          :storeTiming="note.timing",
          :storeLength="note.length"
        )
        //- prev-note(
        //-   v-for="(note, index) in prevNotes",
        //-   :key="index + '-prev-note'",
        //-   :index="index",
        //-   :track="note.track",
        //-   :storeKeyNumber="note.key",
        //-   :storeTiming="note.timing",
        //-   :storeLength="note.length"
        //- )
        orig-note(
          v-for="(note, index) in origNotes",
          :key="index + '-orig-note'",
          :index="index",
          :track="note.track",
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
        progress-line(key="progress-line")
        seed-line(key="seed-line")
        mask-start-line(key="mask-start-line")
        mask-end-line(key="mask-end-line")
</template>

<script>
import ScoreRow from '@/components/vueseq/ScoreRow'
import Note from '@/components/vueseq/Note'
import PrevNote from '@/components/vueseq/PrevNote'
import OrigNote from '@/components/vueseq/OrigNote'
import ScoreLine from '@/components/vueseq/ScoreLine'
import ProgressLine from '@/components/vueseq/line_controls/ProgressLine'
import SeedLine from '@/components/vueseq/line_controls/SeedLine'
import MaskStartLine from '@/components/vueseq/line_controls/MaskStartLine'
import MaskEndLine from '@/components/vueseq/line_controls/MaskEndLine'
import { allKeys, getTypeOfKey, getKeyNumber } from '@/lib/getOctaves'
import { pixelPerBeat } from '@/lib/config'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState, mapGetters } = createNamespacedHelpers('sequence')

export default {
  components: {
    ScoreRow,
    PrevNote,
    OrigNote,
    Note,
    ScoreLine,
    ProgressLine,
    SeedLine,
    MaskStartLine,
    MaskEndLine
  },

  props: {
    gridOpacity: { type: Number, default: 1 }
  },
  data () {
    return {
      keys: allKeys.map(key => {
        return {
          type: getTypeOfKey(key),
          number: getKeyNumber(key)
        }
      }).reverse(),
      scoreScrollLeft: 0,
      scoreRect: { left: 0, top: 0, right: 0, bottom: 0 }
    }
  },
  computed: {
    ...mapState(['notes', 'prevNotes', 'origNotes']),
    ...mapGetters(['scoreLength']),
    beats () {
      console.log('Beats', this.scoreLength)
      return Array(Math.ceil(this.scoreLength))
    },
    width () {
      return `${this.scoreLength * pixelPerBeat}px`
    },
    scoreLeftOffset () {
      return this.scoreScrollLeft - this.scoreRect.left
    }
  },
  mounted () {
    this.scoreRect = this.$el.getBoundingClientRect()
    window.addEventListener('resize', this.onResize)
  },
  methods: {
    ...mapActions(['scrollLeft']),
    onScroll () {
      this.scoreScrollLeft = this.$el.scrollLeft
      this.scrollLeft(this.scoreScrollLeft)
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
  overflow-x: scroll;
  position: relative; /* Required for generate button absolute positioning */
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
