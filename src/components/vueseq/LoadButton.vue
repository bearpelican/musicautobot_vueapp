<template lang="pug">
  md-button.md-icon-button.md-raised.md-accent(
    @click.native="toggle"
  )
    md-icon {{ icon }}
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
