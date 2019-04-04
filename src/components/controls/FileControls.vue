<template>

  <!-- md-speed-dial.md-fab-bottom-right(md-mode="scale")
    md-button.md-icon-button.md-raised.md-accent(
      @click.native="toggle"
    )
      md-icon 'folder_open'
    md-button.md-icon-button.md-raised.md-accent(
      @click.native="toggle"
    )
      md-icon 'folder_open' -->
  <md-speed-dial>
    <md-speed-dial-target @click="exportMidi">
      <md-icon>save</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button" @click="$refs.fileUpload.click()">
        <md-icon>cloud_upload</md-icon>
        <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
      </md-button>

      <!-- Save state for editing later? -->
      <!-- <md-button class="md-icon-button">
        <md-icon>save</md-icon>
      </md-button> -->
    </md-speed-dial-content>
  </md-speed-dial>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('sequence')

export default {
  components: {
  },
  data () {
    return { }
  },
  computed: {
    ...mapState(['appState']),
    icon () {
      return 'folder_open'
    }
  },
  methods: {
    ...mapActions(['importMidi', 'exportMidi']),
    loadLocalFile (event) {
      const file = this._.get(event, 'target.files[0]')
      if (this._.get(file, 'name', '').split('.').pop() !== 'mid') {
        console.log('Error loading file', file)
        // (AS) todo: show error UI
        return
      }

      const reader = new FileReader()
      reader.onload = e => this.importMidi(e.target.result)
      reader.readAsArrayBuffer(file)
    }
  }
}
</script>

<style scoped>
/* .note-preview {
  font-family: "notes";
  font-size: 20px;
} */
</style>
