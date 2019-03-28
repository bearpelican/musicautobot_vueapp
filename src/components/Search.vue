<template>
  <div class="search">
    <model-list-select :list="songs"
                    v-model="songItem"
                    option-value="midi"
                    :custom-text="songDisplayName"
                    placeholder="select song">
    </model-list-select>

<!--
    <form class="form-inline md-form form-sm active-purple-2 mt-2">
        <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search">
        <i class="fas fa-search" aria-hidden="true"></i>
    </form> -->

  </div>
</template>

<script>

import $backend from '@/backend'
import { ModelListSelect } from 'vue-search-select'

export default {
  name: 'search',
  data () {
    return {
      list: [],
      item: {},
      error: ''
    }
  },
  methods: {
    getSongs () {
      $backend.axios.get('songs/all')
        .then(response => {
          this.songs = response.data.result
        })
    },
    songDisplayName (item) {
      return `${item.artist} - ${item.title} - ${item.section}`
    },
    resetSearch () {
      this.songItem = {}
    },
    selectFromParentComponent1 () {
      // select option from parent component
      this.songItem = this.options[0]
    },
    didSelectItem (item) {

    }
  },
  mounted () {
    this.getSongs()
  },
  components: {
    ModelListSelect
  }
}

</script>

<style lang="scss">

// .active-purple-2 input[type=text]:focus:not([readonly]) {
//     border-bottom: 1px solid #ce93d8;
//     box-shadow: 0 1px 0 0 #ce93d8;
// }

</style>
