<template>
  <div class="predict">
    <search id='song-search'></search>
    <hr style='margin-top: 0px;' />
    <div id='sequence-header'>

      <div v-if="loading" style="position:absolute; left:0; right:0; margin:auto">
        <!-- <b-spinner type="grow" label="Spinning"></b-spinner> -->
        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
        <b-spinner type="grow" label="Spinning"></b-spinner>
        <b-spinner type="grow" variant="primary" label="Spinning"></b-spinner>
        <label style='font-size: 2em; margin: 0px 10px;'>Loading Song...</label>
        <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
        <b-spinner type="grow" label="Spinning"></b-spinner>
        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
      </div>
      <input id="sequence-title" v-model="seqName" v-if="!loading" class="form-input">
    </div>
    <sequencer v-if="showSequence"></sequencer>
  </div>
</template>

<script>

import SongMeta from '@/components/vueseq/SongMeta'
import Sequencer from '@/components/Sequencer'
import Search from '@/components/Search'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('predict')
const { mapActions: seqMapActions, mapState: seqMapState } = createNamespacedHelpers('sequence')

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
    ...mapState(['songs', 'songItem', 'midiSeq', 'loading']),
    ...seqMapState(['notes', 'name']),
    showSequence () {
      return !this._.isEmpty(this.notes) || this.debug
    },
    seqName: {
      set (name) { this.updateName(name) },
      get () { return this.name }
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'fetchMidi']),
    ...seqMapActions(['updateName'])
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

#song-search {
  margin: 0px 210px;
}

#sequence-title {
  display: inline-block;
  width: 50%;
  height: 40px;
  transition: all 0.3s ease-out;
  text-align: center;
  font-size: 2em;
  border: none;
}
</style>
