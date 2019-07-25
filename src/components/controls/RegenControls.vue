<template>
  <div>
    <div class='control-group'>
      <div class='control-group-header'>Predict</div>
      <v-btn-toggle class="control-group-toggle" v-model="selectPredictionType" mandatory>
        <v-btn text v-for="ptype in predictionTypes" v-bind:key="ptype.name" :value="ptype">
          {{ptype.displayName}}
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
  name: 'regen-controls',
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
#prediction-type-hint {
  display: block;
  margin-top: 10px;
}

.v-btn-toggle>.v-btn {
  height: 36px;
}
.v-btn--active {
  color: rgb(255, 147, 147) !important;
}

</style>
