<template>
  <div header-controls>
    <search id='song-search'></search>
    <!-- <hr style='margin-top: 0px; position: relative; top: -22px' /> -->
    <v-btn dark small color="green lighten-1" @click="exportMidi">
      Shuffle
      <v-icon>shuffle</v-icon>
    </v-btn>
    <v-btn dark small color="green lighten-1" @click="$refs.fileUpload.click()">
      Import
      <v-icon>folder</v-icon>
      <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
    </v-btn>
    <v-btn dark small color="green lighten-1" @click="clear">
      Blank
      <v-icon>create_new_folder</v-icon>
    </v-btn>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import Search from '@/components/controls/Search'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  name: 'header-controls',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['appState'])
  },
  watch: {
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
  },
  mounted () {
  },
  components: {
    Search
  }
}

</script>

<style scoped lang="scss">

.v-btn {
  float: right;
}

</style>
