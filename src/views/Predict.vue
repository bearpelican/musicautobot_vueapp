<template>
  <div class="predict">
    <search id='song-search'></search>
    <hr style='margin-top: 0px; position: relative; top: -22px' />
    <tutorial v-if="tutorialStep === 0" id='tutorial-one'></tutorial>
    <sequencer :style="sequenceStyle">
      <tutorial-two v-if="tutorialStep === 1" id='tutorial-two'></tutorial-two>
      <loading v-if="this.loadingState !== null" id='loading-predict' :value=loadingState></loading>
    </sequencer>
  </div>
</template>

<script>

import SongMeta from '@/components/vueseq/SongMeta'
import Sequencer from '@/components/Sequencer'
import Search from '@/components/Search'
import Loading from '@/components/Loading'
import Tutorial from '@/components/Tutorial'
import TutorialTwo from '@/components/TutorialTwo'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('predict')

export default {
  name: 'predict',
  data () {
    return {
      error: '',
      debug: true
    }
  },
  watch: {
    songItem (val) {
      console.log('Song item changed:', val)
      if (!this._.isEmpty(val)) {
        console.log('Song item updated. Fetching midi now', val)
        this.fetchMidi(val)
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
        display: (this.loadingState !== null) ? 'block' : 'none'
      }
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'fetchMidi', 'loadSong', 'loadState'])
  },
  mounted () {
    this.fetchSongs()

    // this.fetchMidi({ display: "Broken Arrows - Avicii - Intro-And-Verse", sid: "b332754ce574b8ce079dbb8ec6148fb6" })
    // this.loadState('fc9f40e7-85ff-4097-8b0f-eaa463cd5ae3')
    console.log('sjkfsdklfsdjlf')
    console.log(this.$route.params)
    if (this._.isString(this.$route.params.pid)) {
      this.loadSong(this.$route.params.pid)
    }
    if (this._.isString(this.$route.params.sid)) {
      this.loadState(this.$route.params.sid)
    }
  },
  components: {
    SongMeta,
    Sequencer,
    Search,
    Loading,
    Tutorial,
    TutorialTwo
  }
}

</script>

<style lang="scss">

#loading-predict {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}

#song-search {
  margin: 0px 210px;
}

#tutorial-one {
  position: absolute;
}

#tutorial-two {
  position: absolute;
  z-index: 3;
}
</style>
