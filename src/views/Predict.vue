<template>
  <div class="predict">
    <search></search>
    <div v-if="showSequence">
      <song-meta></song-meta>
    </div>

    <div v-if="showSequence">
      <hr />
      <sequencer></sequencer>
    </div>
  </div>
</template>

<script>

import SongMeta from '@/components/vueseq/SongMeta'
import Sequencer from '@/components/Sequencer'
import Search from '@/components/Search'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('predict')
const { mapState: seqMapState } = createNamespacedHelpers('sequence')

export default {
  name: 'predict',
  data () {
    return {
      error: '',
      debug: true
    }
  },
  watch: {
    songItem () {
      console.log('Song item updated. Fetching midi now', this.songItem)
      this.fetchMidi(this.songItem)
    }
  },
  computed: {
    ...mapState(['songs', 'songItem', 'midiSeq']),
    ...seqMapState(['notes']),
    showSequence () {
      return !this._.isEmpty(this.notes) || this.debug
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
    Search
  }
}

</script>

<style lang="scss">

// .score {
//   width: 50%;
//   background-color: white;
// }

</style>
