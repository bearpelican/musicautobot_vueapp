<template lang="pug">
  md-button.md-icon-button.md-raised.md-accent(
    @click.native="toggle"
  )
    md-icon {{ icon }}
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
