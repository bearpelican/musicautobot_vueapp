<template>
  <div class="predict">
    <model-list-select :list="songs"
                    v-model="songItem"
                    option-value="midi"
                    :custom-text="songDisplayName"
                    placeholder="select song">
    </model-list-select>

    <div class="flex-result">
      <table class="ui celled table">
        <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Section</th>
          <th>BPM</th>
          <th>Genre</th>
          <th>Seconds</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{{songItem.title}}</td>
          <td>{{songItem.artist}}</td>
          <td>{{songItem.section}}</td>
          <td>{{songItem.ht_bpm}}</td>
          <td>{{songItem.genres}}</td>
          <td>{{songItem.seconds}}</td>
        </tr>
        </tbody>
      </table>
      <button v-on:click="predict">Predict</button>
    </div>
    <img class='score' :src="scoreImageSrc" alt="">

<!--
    <form class="form-inline md-form form-sm active-purple-2 mt-2">
        <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search">
        <i class="fas fa-search" aria-hidden="true"></i>
    </form> -->

  </div>
</template>

<script>

import $backend from '../backend'
import { ModelListSelect } from 'vue-search-select'

export default {
  name: 'predict',
  data () {
    return {
      songs: [],
      predictItem: {},
      songItem: {},
      scoreImageSrc: require('@/assets/flask-logo.png'),
      error: ''
    }
  },
  // watch: {
  //   predictItem: (val) => {
  //     this.fetchScore(val.pid)
  //     // this.fetchMidi(val.pid)
  //   }
  // },
  methods: {
    // Searching
    fetchSongs () {
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

    // Display

    // Predict
    predict () {
      $backend.axios.post('predict', { np_file: this.songItem.numpy })
        .then(response => {
          this.predictItem = response.data.result
          this.fetchScore(this.predictItem.pid)
        })
    },
    fetchScore (pid) {
      $backend.axios.get(`predict/${pid}/score`, { responseType: 'arraybuffer' })
        .then(response => {
          this.scoreImageSrc = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64')
        })
    },
    testScore () {
      $backend.axios.get(`predict/1de8021e-941b-4047-a881-223103266eba/score`, { responseType: 'arraybuffer' })
        .then(response => {
          this.scoreImageSrc = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64')
        })
    }
  },
  mounted () {
    this.fetchSongs()
    this.testScore()
    // this.scoreImageSrc = require("@/assets/vue-logo.png")
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

.score {
  margin: 10px 100px;
}

</style>
