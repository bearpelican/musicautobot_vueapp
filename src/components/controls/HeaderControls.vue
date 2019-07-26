<template>
  <div class="header-controls">

    <div class="title-controls">

      <search-table></search-table>
      <sequence-title></sequence-title>
      <div>
        <!-- <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn outline small color="green lighten-1" v-on="on">
              Save
            </v-btn>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in saveItems"
              :key="index"
              @click="saveFormat(item)"
            >
              <v-list-tile-title>{{ item }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu> -->
        <v-btn outlined small color="green lighten-1" @click="exportMidi">
          Save
        </v-btn>
        <v-btn outlined small color="green lighten-1" @click="share">
          Share
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
import SearchTable from '@/components/controls/SearchTable'
import SequenceTitle from '@/components/vueseq/SequenceTitle'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  name: 'header-controls',
  data () {
    return {
      showSave: false,
      saveItems: ['Midi', 'Piano Score', 'Wav']
    }
  },
  computed: {
    ...mapState(['appState'])
  },
  watch: {
  },
  methods: {
    ...mapActions(['exportMidi', 'clear']),
    share () {
      const url = window.location.href
      const text = `Check out this song I just generated with #musicautobot`
      window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
    }
    // saveFormat (format) {
    //   if (format === 'Midi') {
    //     this.exportMidi()
    //   }
    //   if (format === 'Piano Score') {

    //   }
    //   if (format === 'Wav') {

    //   }
    // }
  },
  mounted () {
  },
  components: {
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
  margin: 0px 5px;
  float: right;
}

</style>
