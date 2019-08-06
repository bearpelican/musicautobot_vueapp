<template>
  <div class="predict">
    <header-controls id="header-controls"></header-controls>
    <tutorial v-if="tutorialStep === 0" id='tutorial-one'></tutorial>
    <sequencer :style="sequenceStyle">
      <template v-slot:overlay>
        <generate-button></generate-button>
        <tutorial-two v-if="tutorialStep === 1" id='tutorial-two'></tutorial-two>
        <loading id='loading-predict' :value=loadingState :style="loadingStyle"></loading>
      </template>
    </sequencer>
    <footer-controls></footer-controls>
  </div>
</template>

<script>

import Sequencer from '@/components/Sequencer'
import HeaderControls from '@/components/controls/HeaderControls'
import FooterControls from '@/components/controls/FooterControls'
import GenerateButton from '@/components/controls/GenerateButton'
import Loading from '@/components/Loading'
import Tutorial from '@/components/Tutorial'
import TutorialTwo from '@/components/TutorialTwo'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations, mapState } = createNamespacedHelpers('predict')
const { mapActions: seqMapActions } = createNamespacedHelpers('sequence')

export default {
  name: 'predict',
  data () {
    return {
      error: '',
      debug: false
    }
  },
  computed: {
    ...mapState(['loadingState', 'tutorialStep']),
    sequenceStyle () {
      return {
        visibility: (this.tutorialStep !== 0 || this.debug) ? 'visible' : 'hidden'
      }
    },
    loadingStyle () {
      return {
        // display: 'block'
        display: (this.loadingState !== null) ? 'block' : 'none'
      }
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  created () {
    this.fetchData()
  },
  methods: {
    ...mapActions(['loadSong', 'loadPrediction']),
    ...seqMapActions(['clear']),
    ...mapMutations(['updateTutorialStep', 'updateSeedLen']),
    fetchData () {
      const path = this.$route.path
      console.log('PATHS', path)
      console.log('params', this.$route.params)
      // const paths = this.$route.path.split('/')
      const sid = this.$route.params.sid
      const pid = this.$route.params.pid
      if (sid) {
        if (sid === 'blank') {
          this.clear()
        } else {
          this.loadSong(sid)
        }
      } else if (pid) {
        this.loadPrediction(pid)
      }
    }
  },
  components: {
    Sequencer,
    HeaderControls,
    FooterControls,
    GenerateButton,
    Loading,
    Tutorial,
    TutorialTwo
  }
}

</script>

<style lang="scss">

.predict {
  display: flex;
  flex-direction: column;
  margin: 0px 100px;
}

#loading-predict {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}

#header-controls {
  margin: 20px 0px 10px 0px;
  // box-shadow: 0px 5px 2px;
}

#tutorial-one {
  position: absolute;
}

#tutorial-two {
  position: absolute;
  z-index: 3;
}
</style>
