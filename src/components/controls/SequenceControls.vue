<template>
  <div class='control-group'>
    <div class='control-group-header'>Playback</div>

    <div class='control-group-content'>
      <div class='control-group-control'>
        <div class='control-group-label'>BPM: {{ this.bpm }}</div>
        <v-slider id="bpm" class="control-group-slider" color="blue" v-model="selectBPM" :min="60" :max="150" :step="1" hide-details></v-slider>
      </div>

      <div class='control-group-control'>
        <div class='control-group-label'>Instrument</div>
        <v-btn-toggle class="control-group-toggle" v-model="selectInstrumentType">
          <v-btn text value="piano">
            Piano
          </v-btn>
          <v-btn text value="synth">
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
  },
  mounted () {
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

#synth-form-group {
  margin-bottom: 0px;
}

#synth-radios {
  transform: scale(0.8);
  color: #2196F3;
  /* height: 20px;
  font-size: 0.5rem; */
}

.v-btn--active {
  color: #2196F3 !important;
}
.control-group-header {
  color: #2196F3;
}

</style>
