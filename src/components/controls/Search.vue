<template>
  <v-autocomplete
    v-model="selectSong"
    hint="Ex: La Bamba, Bach, etc."
    :items="results"
    item-text="display"
    :search-input.sync="searchResults"
    :label="'Choose a song...'"
    no-filter
    clearable
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
import { setTimeout } from 'timers'
const { mapActions, mapState, mapMutations } = createNamespacedHelpers('predict')

export default {
  name: 'search',
  data () {
    return {
      results: [],
      fuse: null,
      term: null,
      debounce: null,
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
        if (this.songItem !== songItem) {
          this.updateSongItem(songItem)
        }
        return this.songItem
      },
      get () {
        return null // Return null otherwise we get into infinite loop when we switch to about and come back
        // return this.songItem
      }
    },
    searchResults: {
      set (val) {
        if (this.debounce !== null) {
          this.debounce(val)
        }
      },
      get () {
        return null
      }
    }
  },
  watch: {
    songs () {
      this.loadSearch()
    }
  },
  methods: {
    ...mapMutations(['updateSongItem']),
    ...mapActions(['fetchSongs']),
    loadSearch () {
      if (this._.isEmpty(this.songs)) return
      if (this.fuse !== null) return
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'artist',
          'title'
        ]
      }
      this.fuse = new Fuse(this.songs, options)
      console.log('Loaded search')
      this.debounce = this._.debounce(this.updateSearch, 100)
      this.searchResults = 'avicii'
    },
    updateSearch (term) {
      if (this.fuse === null || this._.isEmpty(term) || this._.isEmpty(this.songs)) return
      setTimeout(() => {
        this.results = this.fuse.search(term, { limit: 10 })
      }, 0)
    }
  },
  mounted () {
    // this.loadSearch()
  }
}

</script>

<style scoped lang="scss">

</style>
