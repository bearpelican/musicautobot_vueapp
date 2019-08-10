<script>
import { createNamespacedHelpers } from 'vuex'
import DraggableLine from './DraggableLine'
const { mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  extends: DraggableLine,
  props: { },
  data () {
    return {
      divID: 'seed-line'
    }
  },
  computed: {
    ...mapState(['seedLen', 'predictionType']),
    offset () {
      return (this.beat <= 0) ? 2 : -4
    },
    hidden () {
      return ['pitch', 'rhythm'].includes(this.predictionType.name)
    },
    beat: {
      set (beat) { this.updateSeedLen(beat) },
      get () { return this.seedLen }
    }
  },
  methods: {
    ...mapMutations(['updateSeedLen'])
  }
}
</script>

<style scoped>
#seed-line {
  z-index: 3;
  width: 8px;
  border-right-width: 6px;
  border-right-style: dashed;
  border-right-color: #a35340;
}
</style>
