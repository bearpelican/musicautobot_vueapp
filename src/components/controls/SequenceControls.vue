<template>
  <md-speed-dial>
    <md-speed-dial-target @click="toggle">
      <md-icon>{{ icon }}</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button" @click="$refs.fileUpload.click()">
        <md-icon>cloud_upload</md-icon>
        <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial>
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
