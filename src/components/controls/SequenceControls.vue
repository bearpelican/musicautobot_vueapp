<template>
  <div class="control-group">
    <div class="control-group-header">
      Playback Controls
    </div>

    <div class="control-group-content">
      <div class="control-group-control">
        <div class="control-group-label">
          BPM: {{ bpm }}
        </div>
        <v-slider
          id="bpm"
          v-model="selectBPM"
          class="control-group-slider"
          color="blue"
          :min="60"
          :max="200"
          :step="1"
          hide-details
        />
      </div>

      <div class="control-group-control">
        <div class="control-group-label">
          Instrument
        </div>
        <v-btn-toggle
          v-model="selectInstrumentType"
          class="control-group-toggle"
        >
          <v-btn
            text
            value="piano"
          >
            Piano
          </v-btn>
          <v-btn
            text
            value="synth"
          >
            Synth
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  data () {
    return { }
  },
  computed: {
    ...mapState(['appState', 'bpm', 'instrumentType', 'progressTime']),
    icon () {
      return this.appState === 'playing' ? 'stop' : 'play_arrow'
    },
    selectBPM: {
      set (bpm) { this.updateBPM(bpm) },
      get () { return this.bpm }
    },
    selectInstrumentType: {
      set (instrumentType) { this.updateInstrumentType({ instrumentType }) },
      get () { return this.instrumentType }
    }
  },
  methods: {
    ...mapActions(['play', 'stop', 'updateBPM', 'updateInstrumentType']),
    toggle () {
      if (this.appState === 'editing') {
        this.play()
      } else {
        this.stop()
      }
    }
    // voidEvent (event) {
    //   event.handled = true
    //   event.stopPropagation()
    // }
  }
}
</script>

<style scoped lang="scss">

.control-group-toggle {
  margin-top: 5px;
  .v-btn {
    height: 20px;
    font-size: .8em;
  }
}

.v-btn--active {
  color: #2196F3 !important;
}
.control-group-header {
  color: #2196F3;
}

</style>
