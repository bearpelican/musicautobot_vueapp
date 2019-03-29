<template>
  <div class="predict">
    <model-list-select :list="songs"
                    v-model="selectedSong"
                    option-value="midi"
                    :custom-text="songDisplayName"
                    placeholder="select song">
    </model-list-select>
    <div v-if="!this._.isEmpty(this.songItem) || this.debug">
      <song-meta></song-meta>
      <predict-controls></predict-controls>
    </div>

    <div v-if="!this._.isEmpty(this.midiSeq) || this.debug">
      <hr />
      <sequencer></sequencer>
    </div>

    <!-- <img class='score' :src="scoreImageSrc" alt=""> -->

  </div>
</template>

<script>

import { ModelListSelect } from 'vue-search-select'
import SongMeta from '@/components/vuepred/SongMeta'
import PredictControls from '@/components/vuepred/PredictControls'
import Sequencer from '@/components/Sequencer'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  name: 'predict',
  data () {
    return {
      scoreImageSrc: null,
      error: '',
      midiSong: null,
      debug: true
    }
  },
  // watch: {
  //   predictItem: (val) => {
  //     this.fetchScore(val.pid)
  //     // this.fetchMidi(val.pid)
  //   }
  // },
  computed: {
    ...mapState(['songs', 'pID', 'songItem', 'midiSeq']),
    predictDisabled () {
      return this._.isEmpty(this.songItem)
    },
    selectedSong: {
      set (songItem) {
        console.log(songItem)
        // this.$store.commit('updateSongItem', songItem)
        this.updateSongItem(songItem)
        // (AS) TODO: figure out why we have to pass songItem to fetchSongMidi. Store should already be updated by then
        console.log('Fetching song midi')
        this.fetchSongMidi(songItem)
      },
      get () {
        return this.songItem
      }
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'fetchSongMidi']),
    ...mapMutations(['updateSongItem']),
    // Searching
    songDisplayName (item) {
      return `${item.artist} - ${item.title} - ${item.section}`
    },
    resetSearch () {
      this.selectedSong = {}
    }
  },
  mounted () {
    this.fetchSongs()
    // this.testScore()
    // this.testMidi()
    // this.scoreImageSrc = require("@/assets/jtech-logo.png")
  },
  components: {
    ModelListSelect,
    SongMeta,
    PredictControls,
    Sequencer
  }
}

</script>

<style lang="scss">

.score {
  width: 50%;
  background-color: white;
}

</style>
