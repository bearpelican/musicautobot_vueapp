<template>
  <md-autocomplete v-model="term" :md-options="results" @md-changed="updateSearch" @md-selected="updateSongItem" md-placeholder='Search for a pop song as a starting point!'>
    <label>Select Seed</label>
    <template slot="md-autocomplete-item" slot-scope="{ item, term }">{{ item.display }}</template>
  </md-autocomplete>
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
    ...mapState(['songs', 'songItem'])
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
          'display'
          // "genres"
        ]
      }
      this.fuse = new Fuse(this.songs, options)
    },
    async updateSearch (term) {
      console.log('Searching')
      this.term = term || ''
      console.log(this.term)
      let results = await this.fuse.search(this.term, { limit: 10 })
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
    }
  },
  mounted () {
    // this.loadSearch()
  }
}

</script>

<style lang="scss">

// .active-purple-2 input[type=text]:focus:not([readonly]) {
//     border-bottom: 1px solid #ce93d8;
//     box-shadow: 0 1px 0 0 #ce93d8;
// }

</style>
