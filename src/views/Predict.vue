<template>
  <div class="predict">
    <search id='song-search'></search>
    <hr style='margin-top: 0px; position: relative; top: -22px' />
    <tutorial v-if="firstTime" id='tutorial-one'></tutorial>
    <loading id='loading-predict' :value=loadingState :style="loadingStyle"></loading>
    <tutorial-two id='tutorial-two'></tutorial-two>
    <sequencer :style="sequenceStyle">
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
      debug: false
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
    ...mapState(['songItem', 'loadingState', 'firstTime']),
    sequenceStyle () {
      return {
        visibility: (!this.firstTime || this.debug) ? 'visible' : 'hidden',
        'pointer-events': (this.loadingState === null) ? 'all' : 'none',
        opacity: (this.loadingState === null) ? 1 : 0.5
      }
    },
    loadingStyle () {
      return {
        display: (this.loadingState !== null) ? 'block' : 'none'
      }
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'fetchMidi'])
  },
  mounted () {
    this.fetchSongs()
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
  right: 0;
  margin: auto;
  top: 50%;
  z-index: 3;
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
