<template>
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
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('predict')

export default {
  name: 'song-meta',
  data () {
    return {
      error: ''
    }
  },
  computed: {
    ...mapState(['songItem'])
  },
  methods: {
  },
  mounted () {
  },
  components: {
  }
}

</script>
