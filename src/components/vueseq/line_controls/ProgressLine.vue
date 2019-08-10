<script>
import DraggableLine from './DraggableLine'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('sequence')

export default {
  extends: DraggableLine,
  data () {
    return {
      divID: 'progress-line'
    }
  },
  computed: {
    ...mapState(['progressTime', 'playOffset', 'appState']),
    offset () {
      return (this.beat <= 0) ? 2 : 0
    },
    beat: {
      set (beat) { this.updatePlayOffset(beat) },
      get () {
        return (this.appState === 'editing') ? this.playOffset : this.progressTime
      }
    }
  },
  methods: {
    ...mapMutations(['updatePlayOffset'])
  }
}
</script>

<style scoped>

#progress-line {
  width: 2px;
  border-left-width: 2px;
  border-left-style: solid;
  border-left-color: #424242;
}
</style>
