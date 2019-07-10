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

export default {
  name: 'predict',
  data () {
    return {
      error: '',
      debug: false
    }
  },
  watch: {
    songItem (val) {
      if (!this._.isEmpty(val)) {
        console.log('Song item updated. Fetching midi now', val)
        this.fetchMidi(val)
        this.$router.push({ path: `/song/${val.sid}` })
      }
    }
  },
  computed: {
    ...mapState(['songItem', 'loadingState', 'tutorialStep']),
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
  methods: {
    ...mapActions(['fetchMidi', 'loadSong', 'loadState', 'randomSong']),
    ...mapMutations(['updateTutorialStep'])
  },
  mounted () {
    // this.loadSong('b332754ce574b8ce079dbb8ec6148fb6')
    // this.loadState('074c1eab7661f7c8cb34052c915dc0f0')
    if (!this._.isEmpty(this.$route.query.skip)) {
      this.updateTutorialStep(2)
    }
    if (this._.isString(this.$route.params.pid)) {
      this.loadState(this.$route.params.pid)
    } else if (this._.isString(this.$route.params.sid)) {
      this.loadSong(this.$route.params.sid)
    } else {
      this.randomSong()
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
