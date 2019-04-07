<template>
  <!-- <div>
    <md-autocomplete v-model="term" :md-options="results" @md-changed="updateSearch" @md-selected="songSelected" md-placeholder='Search for a pop song as a starting point!'>
      <label>{{ placeholder }}</label>
      <template slot="md-autocomplete-item" slot-scope="{ item, term }">{{ item.display }}</template>
    </md-autocomplete>
  </div> -->

  <v-autocomplete
    v-model="selectSong"
    hint="Ex: La Bamba, Bach, etc."
    :items="results"
    item-text="display"
    :search-input.sync="searchResults"
    :label="'Choose a song...'"
    no-filter
    persistent-hint
    return-object
  >
    <template v-slot:append-outer>
      <v-slide-x-reverse-transition
        mode="out-in"
      >
      </v-slide-x-reverse-transition>
    </template>
  </v-autocomplete>
</template>

<script>

import Fuse from 'fuse.js'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  name: 'search',
  data () {
    return {
      results: [],
      term: null,
      fuse: null,
      isLoading: false,
      error: ''
    }
  },
  computed: {
    ...mapState(['songs', 'songItem']),
    placeholder () {
      if (this._.has(this.songItem, 'sid')) {
        return 'Select a new song...'
      }
      return 'Search for a song... '
    },
    selectSong: {
      set (songItem) { 
        this.updateSongItem(songItem) },
      get () { 
        return this.songItem }
    },
    searchResults: {
      async set (val) { 
        return await this.updateSearch(val)
      },
      get () { }
    },
  },
  watch: {
    songs () {
      this.loadSearch()
    }
  },
  methods: {
    ...mapMutations(['updateSongItem']),
    ...mapActions(['fetchSongs', 'fetchMidi']),
    loadSearch () {
      if (this._.isEmpty(this.songs)) return
      this.isLoading = true
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'display',
          'genres'
        ]
      }
      this.fuse = new Fuse(this.songs, options)

      this.isLoading = false
      this.results = this.fuse.search('avicii', { limit: 10 })
      console.log('Loaded results')
    },
    async updateSearch (term) {
      if (this.fuse === null || this._.isEmpty(term)) return this.results
      this.isLoading = true
      this.term = term
      console.log(this.term)
      this.results = await this.fuse.search(term, { limit: 10 })
      console.log(this.results)
      this.isLoading = false
      return this.results
    },
    songSelected (item) {
      console.log('Song selected:', item)
      return this.updateSongItem(item)
    }
  },
  mounted () {
    // this.loadSearch()
  }
}

</script>

<style scoped lang="scss">

// .active-purple-2 input[type=text]:focus:not([readonly]) {
//     border-bottom: 1px solid #ce93d8;
//     box-shadow: 0 1px 0 0 #ce93d8;
// }

.md-field {
  margin: 0px;
}
</style>

<style>

.md-menu-content {
  background-color: #ffffffd8;
  z-index: 3;
}
</style>
