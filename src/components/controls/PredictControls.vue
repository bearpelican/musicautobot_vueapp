<template>
  <md-speed-dial>
    <md-speed-dial-target @click="predictMidi">
      <md-icon>cached</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>

      <md-button class="control-group">
        <div class='control-group-header'>Randomness</div>
        <div>
          <div class='control-group-label'>Note: {{ this.noteTempPCT }}%</div>
          <b-form-input id="noteTemp" class="control-group-slider" type="range" v-model.number='selectNoteTemp' min="0.5" max="1.5" step="0.05"></b-form-input>
        </div>
        <div>
          <div class='control-group-label'>Duration: {{ this.durationTempPCT }}%</div>
          <b-form-input id="durTemp" class="control-group-slider" type="range" v-model.number='selectDurationTemp' min="0.3" max="1.1" step="0.05"></b-form-input>
        </div>
      </md-button>
      <md-button class="control-group">
        <div class='control-group-header'>Timesteps</div>
        <div>
          <div class='control-group-label'>Predict: {{ this.nSteps }}</div>
          <b-form-input id="predLen" class="control-group-slider" type="range" v-model.number='selectSteps' min="100" max="350" step="1"></b-form-input>
        </div>
        <div>
          <div class='control-group-label'>Seed: {{ this.seedLen }}</div>
          <b-form-input id="seedLen" class="control-group-slider" type="range" v-model.number='selectSeed' min="1" max="50" step="1"></b-form-input>
        </div>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations, mapState } = createNamespacedHelpers('predict')

export default {
  name: 'song-meta',
  data () {
    return {
      error: ''
    }
  },
  computed: {
    ...mapState(['nSteps', 'seedLen', 'durationTemp', 'noteTemp']),
    selectSteps: {
      set (steps) { this.updateSteps(steps) },
      get () { return this.nSteps }
    },
    selectSeed: {
      set (seedLen) { this.updateSeedLen(seedLen) },
      get () { return this.seedLen }
    },
    selectNoteTemp: {
      set (noteTemp) { this.updateNoteTemp(noteTemp) },
      get () { return this.noteTemp }
    },
    selectDurationTemp: {
      set (durationTemp) { this.updateDurationTemp(durationTemp) },
      get () { return this.durationTemp }
    },
    noteTempPCT () {
      return parseInt((this.noteTemp - 0.5) / 1 * 100)
    },
    durationTempPCT () {
      return parseInt((this.durationTemp - 0.3) / 0.8 * 100)
    }
  },
  methods: {
    ...mapMutations(['updateSteps', 'updateSeedLen', 'updateNoteTemp', 'updateDurationTemp']),
    ...mapActions(['predictMidi'])
  },
  mounted () {
  },
  components: {
  }
}

</script>

<style scoped>

</style>
