<template>
  <v-speed-dial bottom right open-on-hover direction="bottom" transition="scale-transition">
    <template v-slot:activator>
      <v-btn color="grey lighten-5" small fab>
        <v-icon>folder_open</v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green lighten-1" @click="exportMidi">
      <v-icon>save</v-icon>
    </v-btn>
    <v-btn fab dark small color="green lighten-1" @click="$refs.fileUpload.click()">
      <v-icon>cloud_upload</v-icon>
      <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
    </v-btn>
    <v-btn fab dark small color="green lighten-1" @click="clear">
      <v-icon>clear</v-icon>
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
    ...mapState(['appState'])
  },
  methods: {
    ...mapActions(['importMidi', 'exportMidi', 'clear']),
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
