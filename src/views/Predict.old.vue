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
      Number steps:<input v-model.number='nWords' type='number'>
      Seed Length:<input v-model.number='seedLen' type='number'>
      <button v-on:click='predict' :disabled='predictDisabled'>Predict</button>
    </div>
    <img class='score' :src="scoreImageSrc" alt="">

    <!-- <div id='controls'>
      <input type='button' id='play' value='play' />
      <input type='button' id='stop' value='stop' />

      <div id='time-bars-beats'></div>

      <div class='pipe'>|</div>
      <div id='time-seconds'></div>
    </div> -->

    <div id='editor'>
      <div id='score'>
        <div id='pitch-lines'></div>
        <div id='bar-lines'></div>
        <div id='beat-lines'></div>
        <div id='sixteenth-lines'></div>
        <div id='notes'></div>
        <div id='parts'></div>
        <div id='playhead'>
            <div id='playhead-line'></div>
        </div>
      </div>
    </div>
    <div id='controls'>
      <input type='button' id='play' value='play' />
      <input type='button' id='stop' value='stop' />

      <div id='time-bars-beats'></div>

      <div class='pipe'>|</div>
      <div id='time-seconds'></div>

      <div class='pipe'>|</div>
      <div id='mouse-x'>0</div>

      <div class='pipe'>|</div>
      <div id='mouse-y'>0</div>

      <div class='pipe'>|</div>
      <input type='button' id='first' value='<<' />
      <input type='button' id='prev' value='<' />
      <div id='page-numbers'>page 0 of 0</div>
      <input type='button' id='next' value='>' />
      <input type='button' id='last' value='>>' />

      <div class='pipe'>|</div>
      <div>
        <input type='range' id='scale-slider'/>
        <label for='scale-slider' id='scale-label'>#bars 16</label>
      </div>
    </div>

  </div>
</template>

<script>

import $backend from '../backend'
import { ModelListSelect } from 'vue-search-select'
import { loadArrayBuffer } from '../sequencer.js'
import _ from 'lodash'

export default {
  name: 'predict',
  data () {
    return {
      songs: [],
      predictItem: {},
      songItem: {},
      nWords: 240,
      seedLen: 60,
      scoreImageSrc: null,
      error: '',
      midiSong: null
    }
  },
  // watch: {
  //   predictItem: (val) => {
  //     this.fetchScore(val.pid)
  //     // this.fetchMidi(val.pid)
  //   }
  // },
  computed: {
    predictDisabled () {
      return _.isEmpty(this.songItem)
    }
  },
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
      $backend.axios.post('predict', { np_file: this.songItem.numpy, n_words: this.nWords, seed_len: this.seedLen })
        .then(response => {
          this.predictItem = response.data.result
          this.fetchScore(this.predictItem.pid)
          this.fetchMidi(this.predictItem.pid)
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
    },
    testMidi () {
      $backend.axios.get(`predict/1de8021e-941b-4047-a881-223103266eba/midi`, { responseType: 'arraybuffer' })
        .then(response => {
          // this.scoreImageSrc = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64')
          loadArrayBuffer(response.data)
        })
    },
    fetchMidi (pid) {
      $backend.axios.get(`predict/${pid}/midi`, { responseType: 'arraybuffer' })
        .then(response => {
          // this.scoreImageSrc = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64')
          loadArrayBuffer(response.data)
        })
    }
  },
  mounted () {
    this.fetchSongs()
    // this.testScore()
    // this.testMidi()
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
  width: 50%;
  background-color: white;
}

</style>
