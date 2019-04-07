<template>
  <!-- <md-speed-dial>
    <md-speed-dial-target @click="exportMidi">
      <md-icon>save</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button" @click="$refs.fileUpload.click()">
        <md-icon>cloud_upload</md-icon>
        <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
      </md-button>
    </md-speed-dial-content>
  </md-speed-dial> -->
  <v-speed-dial
    :bottom="true"
    :right="true"
    direction="top"
    :open-on-hover="true"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn
        color="blue darken-2"
        dark
        fab
        @click="exportMidi"
      >
        <v-icon>save</v-icon>
      </v-btn>
    </template>
    <v-btn
      fab
      dark
      small
      color="green"
      @click="$refs.fileUpload.click()"
    >
      <v-icon>cloud_upload</v-icon>
      <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
    </v-btn>
  </v-speed-dial>
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
