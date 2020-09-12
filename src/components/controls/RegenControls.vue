<template>
  <div>
    <div class="control-group">
      <v-btn-toggle
        v-model="selectPredictionType"
        class="control-group-toggle"
        mandatory
      >
        <v-btn
          v-for="ptype in predictionTypes"
          :key="ptype.name"
          text
          :value="ptype"
          color="red"
        >
          {{ ptype.displayName }}
        </v-btn>
      </v-btn-toggle>
      <label id="prediction-type-hint">
        {{ predictionType.description }}
      </label>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import { PredictionType } from '@/lib/config'
const { mapMutations, mapState } = createNamespacedHelpers('predict')

export default {
  name: 'RegenControls',
  data () {
    return {
      error: '',
      predictionTypes: PredictionType
    }
  },
  computed: {
    ...mapState(['predictionType']),
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
    ...mapMutations(['updatePredictionType'])
  }
}

</script>

<style scoped>

.control-group {
  margin-top: 10px;
}
#prediction-type-hint {
  display: block;
  margin-top: 10px;
}

.v-btn-toggle>.v-btn {
  height: 36px;
}
/* .v-btn--active {
  color: rgb(255, 147, 147) !important;
} */

</style>
