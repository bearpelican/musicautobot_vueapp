<template>
  <Search />
</template>

<script>

import $backend from '../backend'
import Search from './Search'

export default {
  name: 'predict',
  data () {
    return {
      songs: [],
      songItem: {},
      error: ''
    }
  },
  methods: {
    getSongs () {
      $backend.axios.get('songs/all')
        .then(response => {
          this.songs = response.data.result
        })
    }
  },
  mounted () {
  },
  components: {
    Search
  }
}

</script>

<style lang="scss">

// .active-purple-2 input[type=text]:focus:not([readonly]) {
//     border-bottom: 1px solid #ce93d8;
//     box-shadow: 0 1px 0 0 #ce93d8;
// }

</style>
