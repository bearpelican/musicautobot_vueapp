<template>
  <div class="predict">
    <search id='song-search'></search>
    <hr style='margin-top: 0px;' />
    <tutorial v-if="firstTime" id='first-tutorial'></tutorial>
    <loading id='loading-predict' :value=loadingState :style="loadingStyle"></loading>
    <sequencer :style="sequenceStyle"></sequencer>
  </div>
</template>

<script>

import SongMeta from '@/components/vueseq/SongMeta'
import Sequencer from '@/components/Sequencer'
import Search from '@/components/Search'
import Loading from '@/components/Loading'
import Tutorial from '@/components/Tutorial'
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
      if (!this._.isEmpty(val)) {
        console.log('Song item updated. Fetching midi now', val)
        this.fetchMidi(val)
      }
    }
  },
  computed: {
    ...mapState(['loadingState', 'firstTime']),
    sequenceStyle () {
      return {
        visiblity: (!this.firstTime || this.debug) ? 'visible' : 'hidden',
        disabled: this.loadingState !== null
      }
    },
    loadingStyle () {
      return {
        display: (this.loadingState === null) ? 'block' : 'none'
        // visibility: 'visible'
      }
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'fetchMidi']),
  },
  mounted () {
    this.fetchSongs()
  },
  components: {
    SongMeta,
    Sequencer,
    Search,
    Loading,
    Tutorial
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
  z-index: 3
}

#song-search {
  margin: 0px 210px;
}

#first-tutorial {
  position: absolute;
}
</style>
