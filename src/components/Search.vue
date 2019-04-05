<template>
  <div>
    <md-autocomplete v-model="term" :md-options="results" @md-changed="updateSearch" @md-selected="songSelected" md-placeholder='Search for a pop song as a starting point!'>
      <label>{{ placeholder }}</label>
      <template slot="md-autocomplete-item" slot-scope="{ item, term }">{{ item.display }}</template>
    </md-autocomplete>
  </div>
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
    }
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

      // let results = this.fuse.search('avicii', { limit: 10 })
      // this.results = this.getSanitizedLabels(results)
    },
    async updateSearch (term) {
      console.log('Searching')
      this.term = term
      console.log(this.term)
      let results = await this.fuse.search(term, { limit: 10 })
      // this.results = await this.fuse.search(searchTerm)
      this.results = this.getSanitizedLabels(results)
      console.log(this.results)
      return this.results
    },
    getSanitizedLabels (results) {
      // Super hacky fix from here: https://github.com/vuematerial/vue-material/issues/1322
      // https://github.com/vuematerial/vue-material/issues/1243
      return results.map(label => ({ ...label,
        'toLowerCase': () => label.display.toLowerCase(),
        'toString': () => label.display
      }))
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
