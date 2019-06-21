<template>
  <div class='control-group-content'>
    <div class='control-group-header'>Randomness</div>
    <div>
      <div class='control-group-label'>Tone: {{ noteTempPCT }}%</div>
      <v-slider id="noteTemp" class="control-group-slider" color="red" type="range" v-model='selectNoteTemp' :min="0.7" :max="1.6" :step="0.02" hide-details></v-slider>
    </div>
    <div>
      <div class='control-group-label'>Rythm: {{ durationTempPCT }}%</div>
      <v-slider id="durTemp" class="control-group-slider" color="red" type="range" v-model='selectDurationTemp' :min="0.3" :max="1.0" :step="0.02" hide-details></v-slider>
    </div>

    <div>
      <div class='control-group-label'>Regenerate:</div>
      <v-btn-toggle class="control-group-toggle" v-model="selectPredictionType" mandatory>
        <v-btn flat v-for="ptype in predictionTypes" v-bind:key="ptype.name" :value="ptype">
          {{ptype.displayName}}
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import { PredictionType } from '@/lib/config'
const { mapActions, mapMutations, mapState } = createNamespacedHelpers('predict')

export default {
  name: 'predict-controls',
  data () {
    return {
      error: '',
      predictionTypes: PredictionType
    }
  },
  computed: {
    ...mapState(['nSteps', 'seedLen', 'durationTemp', 'noteTemp']),
    // selectSteps: {
    //   set (steps) { this.updateSteps(steps) },
    //   get () { return this.nSteps }
    // },
    // selectSeed: {
    //   set (seedLen) { this.updateSeedLen(seedLen) },
    //   get () { return this.seedLen }
    // },
    selectNoteTemp: {
      set (noteTemp) { this.updateNoteTemp(noteTemp) },
      get () { return this.noteTemp }
    },
    selectDurationTemp: {
      set (durationTemp) { this.updateDurationTemp(durationTemp) },
      get () { return this.durationTemp }
    },
    noteTempPCT () {
      return parseInt((this.noteTemp - 0.7) / 0.9 * 100)
    },
    durationTempPCT () {
      return parseInt((this.durationTemp - 0.3) / 0.7 * 100)
    },
    selectPredictionType: {
      set (predictionType) { this.updatePredictionType(predictionType) },
      get () { return this.predictionType }
    }
  },
  methods: {
    ...mapMutations(['updateSteps', 'updateSeedLen', 'updateNoteTemp', 'updateDurationTemp', 'updatePredictionType']),
    ...mapActions(['predictMidi'])
    // voidEvent (event) {
    //   event.handled = true
    //   event.stopPropagation()
    // }
  },
  mounted () {
  },
  components: {
  }
}

</script>

<style scoped>

.control-group-header {
  color: #FF5252;
}
</style>
