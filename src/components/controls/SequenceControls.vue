<template>
  <!-- <md-speed-dial id="control-sequence">
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
  </md-speed-dial> -->

  <v-speed-dial bottom right open-on-hover
    direction="top"
    transition="scale-transition">
  <!-- <v-speed-dial bottom right
    direction="top"
    transition="scale-transition"
  > -->
    <template v-slot:activator>
      <!-- <v-btn color="blue darken-2" dark fab> -->
      <v-btn color="blue darken-2" dark fab @click="toggle">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-btn class='control-group'>
      <div class='control-group-content'>
        <div class='control-group-header'>Playback</div>
        <div>
          <div class='control-group-label'>BPM: {{ this.bpm }}</div>
          <v-slider id="noteTemp" class="control-group-slider" v-model="selectBPM" :min="60" :max="150" :step="1" hide-details></v-slider>
        </div>

        <div>
          <div class='control-group-label'>Synth</div>
          <v-btn-toggle class="control-group-toggle" v-model="selectSynthType">
            <v-btn flat value="piano">
              Piano
            </v-btn>
            <v-btn flat value="alien">
              Alien
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </v-btn>
  </v-speed-dial>
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

<style scoped lang="scss">

#control-sequence {
  align-items: flex-end;
  margin-right: 10px;
}

.control-group {
  margin: 0px 10px;
}

.control-group-toggle {
  .v-btn {
    height: 30px;
  }
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
