<template>
  <div class="control-group">
    <div class="control-group-header">
      Creativity
    </div>
    <div class="control-group-content">
      <div class="control-group-control">
        <div class="control-group-label">
          Pitch: {{ noteTempPCT }}%
        </div>
        <v-slider
          id="noteTemp"
          v-model="selectNoteTemp"
          class="control-group-slider"
          color="red"
          type="range"
          :min="0.1"
          :max="2.1"
          :step="0.05"
          hide-details
        />
      </div>
      <div class="control-group-control">
        <div class="control-group-label">
          Rhythm: {{ durationTempPCT }}%
        </div>
        <v-slider
          id="durTemp"
          v-model="selectDurationTemp"
          class="control-group-slider"
          color="red"
          type="range"
          :min="0.1"
          :max="2.1"
          :step="0.05"
          hide-details
        />
      </div>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapState } = createNamespacedHelpers('predict')

export default {
  name: 'PredictControls',
  data () {
    return {
      error: ''
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
      return parseInt((this.noteTemp - 0.1) / 2.0 * 100)
    },
    durationTempPCT () {
      return parseInt((this.durationTemp - 0.1) / 2.0 * 100)
    }
  },
  methods: {
    ...mapMutations(['updateSteps', 'updateSeedLen', 'updateNoteTemp', 'updateDurationTemp'])
    // voidEvent (event) {
    //   event.handled = true
    //   event.stopPropagation()
    // }
  }
}

</script>

<style scoped>

.control-group-header {
  color: #FF5252;
}
</style>
