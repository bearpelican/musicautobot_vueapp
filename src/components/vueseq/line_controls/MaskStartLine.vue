<script>

import DraggableLine from './DraggableLine'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  extends: DraggableLine,
  data () {
    return {
      divID: 'mask-start-line'
    }
  },
  computed: {
    ...mapState(['maskStart', 'maskEnd', 'predictionType']),
    offset () {
      return (this.beat <= 0) ? 2 : -4
    },
    hidden () {
      if (this.maskStart === null) return true
      return !['pitch', 'rhythm'].includes(this.predictionType.name)
    },
    beat: {
      set (beat) { if (beat < this.maskEnd) this.updateMaskStart(beat) },
      get () { return this.maskStart }
    }
  },
  methods: {
    ...mapMutations(['updateMaskStart'])
  }
}
</script>

<style scoped>
div {
  z-index: 3;
  width: 8px;
  border-left-width: 6px;
  border-left-style: dotted;
  border-left-color: #1d1449be;
}
</style>
