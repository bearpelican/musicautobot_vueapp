<template>
  <v-speed-dial bottom right open-on-hover
    direction="top"
    transition="scale-transition">
  <!-- <v-speed-dial bottom right
    direction="top"
    transition="scale-transition" -->
  >
    <template v-slot:activator>
      <!-- <v-btn color="blue darken-2" dark fab> -->
      <v-btn color="blue darken-2" dark fab @click="predictMidi">
        <v-icon>cached</v-icon>
      </v-btn>
    </template>
    <v-btn class='control-group' @click='voidEvent' :ripple="false">
      <div class='control-group-content'>
        <div class='control-group-header'>Randomness</div>
        <div>
          <div class='control-group-label'>Note: {{ this.noteTempPCT }}%</div>
          <v-slider id="noteTemp" class="control-group-slider" type="range" v-model='selectNoteTemp' :min="0.5" :max="1.5" :step="0.05" hide-details></v-slider>
        </div>
        <div>
          <div class='control-group-label'>Duration: {{ this.durationTempPCT }}%</div>
          <v-slider id="durTemp" class="control-group-slider" type="range" v-model='selectDurationTemp' :min="0.3" :max="1.1" :step="0.05" hide-details></v-slider>
        </div>
      </div>
    </v-btn>
    <v-btn class='control-group' @click='voidEvent' :ripple="false">
      <div class='control-group-content'>
        <div class='control-group-header'>Timesteps</div>
        <div>
          <div class='control-group-label'>Predict: {{ this.nSteps }}</div>
          <v-slider id="predLen" class="control-group-slider" type="range" v-model='selectSteps' :min="100" :max="350" :step="1" hide-details></v-slider>
        </div>
        <div>
          <div class='control-group-label'>Seed: {{ this.seedLen }}</div>
          <v-slider id="seedLen" class="control-group-slider" type="range" v-model='selectSeed' :min="1" :max="50" :step="1" hide-details></v-slider>
        </div>
      </div>
    </v-btn>
  </v-speed-dial>
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
    ...mapActions(['predictMidi']),
    voidEvent (event) {
      event.handled = true
      event.stopPropagation()
    }
  },
  mounted () {
  },
  components: {
  }
}

</script>

<style scoped>

</style>
