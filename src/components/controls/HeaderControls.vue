<template>
  <div class="header-controls">

    <div class="title-controls">

      <search-table></search-table>
      <sequence-title></sequence-title>
      <div>
        <v-btn outline small color="green lighten-1">
          Save
        </v-btn>
        <v-btn outline small color="green lighten-1" @click="share">
          Share
        </v-btn>
      </div>
    </div>

    <!-- <v-dialog v-model="isChoosing" max-width="1000px">
      <v-card class="dialog-controls">
        <div>
          <v-btn outline small color="green lighten-1" @click="exportMidi">
            Shuffle
            <v-icon>shuffle</v-icon>
          </v-btn>
          <v-btn outline small color="green lighten-1" @click="$refs.fileUpload.click()">
            Import
            <v-icon>folder</v-icon>
            <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
          </v-btn>
          <v-btn outline small color="green lighten-1" @click="clear">
            Blank
            <v-icon>create_new_folder</v-icon>
          </v-btn>
        </div>
        <search id='song-search'></search>
      </v-card>
    </v-dialog> -->

    <!-- <v-expansion-panel v-model="expansion" expand>
      <v-expansion-panel-content>
        <v-card class="song-controls">
          <v-btn outline small color="green lighten-1" @click="exportMidi">
            Shuffle
            <v-icon>shuffle</v-icon>
          </v-btn>
          <v-btn outline small color="green lighten-1" @click="$refs.fileUpload.click()">
            Import
            <v-icon>folder</v-icon>
            <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
          </v-btn>
          <v-btn outline small color="green lighten-1" @click="clear">
            Blank
            <v-icon>create_new_folder</v-icon>
          </v-btn>
          <search id='song-search' v-bind:searchLabel="'Search...'"></search>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel> -->
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import Search from '@/components/controls/Search'
import SearchTable from '@/components/controls/SearchTable'
import SequenceTitle from '@/components/vueseq/SequenceTitle'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  name: 'header-controls',
  data () {
    return {
      isChoosing: false
    }
  },
  computed: {
    ...mapState(['appState']),
    expansion  () {
      return this.isChoosing ? [true] : []
    }
    // toggleSelection: {
    //   set (bpm) { this.updateBPM(bpm) },
    //   get () { return this.bpm }
    // },
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
    },
    share () {
      const url = window.location.href
      const text = `Check out this song I just generated with #musicautobot`
      window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
    }
  },
  mounted () {
  },
  components: {
    Search,
    SearchTable,
    SequenceTitle
  }
}

</script>

<style scoped lang="scss">

.song-controls {
  display: flex;
}

.dialog-controls {
  display: flex;
  height: 200px;
}

.title-controls {
  display: flex;
  justify-content: space-between;
}

.v-btn {
  float: right;
}

</style>
