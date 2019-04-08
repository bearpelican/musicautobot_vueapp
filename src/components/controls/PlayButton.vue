<template>
  <v-btn color="blue darken-2" dark fab @click="toggle">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  computed: {
    ...mapState(['appState']),
    icon () {
      return this.appState === 'playing' ? 'stop' : 'play_arrow'
    }
  },
  methods: {
    ...mapActions(['play', 'stop']),
    toggle () {
      if (this.appState === 'editing') {
        this.play()
      } else {
        this.stop()
      }
    }
  }
}
</script>
