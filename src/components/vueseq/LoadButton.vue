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
      return 'folder_open'
    }
  },
  methods: {
    ...mapActions(['loadMidi']),
    toggle () {
      this.loadMidi()
    }
  }
}
</script>
