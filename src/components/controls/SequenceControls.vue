<template>
  <md-speed-dial id="control-sequence">
    <md-speed-dial-target @click="toggle">
      <md-icon>{{ icon }}</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="control-group">
        <div>
          <div class='control-group-label'>BPM: {{ this.bpm }}</div>
          <b-form-input id="noteTemp" class="control-group-slider" type="range" v-model.number='selectBPM' min="60" max="150" step="1"></b-form-input>
        </div>
        <b-form-group id='synth-form-group'>
          <div class='control-group-label'>Synth</div>
          <b-form-radio-group
            id="synth-radios"
            v-model="selectSynthType"
            :options="synthOptions"
            buttons
            size="sm"
            button-variant="outline-primary"
          ></b-form-radio-group>
        </b-form-group>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  data () {
    return {
      synthOptions: [{ text: 'piano', value: 'piano' }, { text: 'alien', value: 'alien' }]
    }
  },
  computed: {
    ...mapState(['appState', 'bpm', 'synthType']),
    icon () {
      return this.appState === 'playing' ? 'stop' : 'play_arrow'
    },
    selectBPM: {
      set (bpm) { this.updateBPM(bpm) },
      get () { return this.bpm }
    },
    selectSynthType: {
      set (synthType) { this.updateSynthType({ synthType }) },
      get () { return this.synthType }
    }
  },
  methods: {
    ...mapActions(['play', 'stop', 'updateBPM', 'updateSynthType']),
    toggle () {
      if (this.appState === 'editing') {
        this.play()
      } else {
        this.stop()
      }
    }
  }
}
</script>

<style scoped>

#control-sequence {
  align-items: flex-end;
  margin-right: 10px;
}

.control-group {
  height: 120px;
  margin: 0px 10px;
  border-radius: 30px;
}

.control-group-slider {
  width: 120px;
}

.control-group-label {
  font-size: 0.8rem;
  color: black;
}

.control-group-header {
  font-size: 0.8rem;
  color: black;
  margin: 5px 0px;
  /* background-color: #ff743d80; */
}

#synth-form-group {
  margin-bottom: 0px;
}

#synth-radios {
  transform: scale(0.8);

  /* height: 20px;
  font-size: 0.5rem; */
}

</style>
