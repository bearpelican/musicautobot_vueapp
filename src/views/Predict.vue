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
      debug: false
    }
  },
  computed: {
    ...mapState(['songs', 'songItem', 'midiSeq']),
    predictDisabled () {
      return this._.isEmpty(this.songItem)
    },
    selectedSong: {
      set (songItem) {
        console.log(songItem)
        // this.$store.commit('updateSongItem', songItem)
        this.updateSongItem(songItem)
        // (AS) TODO: figure out why we have to pass songItem to fetchMidi. Store should already be updated by then
        console.log('Fetching song midi')
        this.fetchMidi({ midiID: songItem.sid, type: 'song' })
      },
      get () {
        return this.songItem
      }
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'fetchMidi']),
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

// .score {
//   width: 50%;
//   background-color: white;
// }

</style>
