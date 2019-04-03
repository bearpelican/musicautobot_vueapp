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
    <md-speed-dial-target v-on:click="saveMidi">
      <md-icon>save</md-icon>
    </md-speed-dial-target>

    <md-speed-dial-content>
      <md-button class="md-icon-button" v-on:click="loadMidi">
        <md-icon>cloud_upload</md-icon>
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
    ...mapActions(['loadMidiFile', 'saveMidi']),
    loadMidi () {
      console.log('Loading midi file')
      // this.loadMidiFile()
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
