<template>
  <div class="predict">
    <model-list-select :list="songs"
                    v-model="selectedSong"
                    option-value="midi"
                    :custom-text="songDisplayName"
                    placeholder="select song">
    </model-list-select>
    <div v-if="showSequence">
      <song-meta></song-meta>
    </div>

    <div v-if="showSequence">
      <hr />
      <sequencer></sequencer>
    </div>

    <!-- <img class='score' :src="scoreImageSrc" alt=""> -->

  </div>
</template>

<script>

import { ModelListSelect } from 'vue-search-select'
import SongMeta from '@/components/vueseq/SongMeta'
import Sequencer from '@/components/Sequencer'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('predict')
const { mapState: seqMapState } = createNamespacedHelpers('sequence')

export default {
  name: 'predict',
  data () {
    return {
      scoreImageSrc: null,
      error: '',
      debug: true
    }
  },
  computed: {
    ...mapState(['songs', 'songItem', 'midiSeq']),
    ...seqMapState(['notes']),
    showSequence () {
      return !this._.isEmpty(this.notes) || this.debug
    },
    selectedSong: {
      set (songItem) {
        console.log(songItem)
        // this.$store.commit('updateSongItem', songItem)
        this.updateSongItem(songItem)
        // (AS) TODO: figure out why we have to pass songItem to fetchMidi. Store should already be updated by then
        console.log('Fetching song midi')
        this.fetchMidi({ midiID: songItem.sid, type: 'song', name: songItem.title })
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
