<template>
  <v-btn color="blue darken-2" dark fab @click="toggle">
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')
const { mapMutations: predMapMutations } = createNamespacedHelpers('predict')

export default {
  computed: {
    ...mapState(['appState']),
    icon () {
      return this.appState === 'playing' ? 'stop' : 'play_arrow'
    }
  },
  methods: {
    ...mapActions(['play', 'stop', 'progressTime']),
    ...predMapMutations(['updateTutorialStep']),
    toggle () {
      this.updateTutorialStep(2)
      if (this.appState === 'editing') {
        this.play()
      } else {
        this.stop()
      }
    }
  }
}
</script>
