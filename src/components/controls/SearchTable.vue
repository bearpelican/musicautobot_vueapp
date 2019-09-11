<template>
  <div>
  <v-btn outlined small color="green lighten-1" @click="showDialog = true">
    New Song...
  </v-btn>
  <v-btn outlined small color="green lighten-1" @click="restart" v-if="!_.isEmpty(sid)">
    Restart
  </v-btn>

    <v-dialog v-model="showDialog" max-width="1000px">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="searchResults"
            append-icon="search"
            :label="searchLabel"
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn outlined small color="green lighten-1" @click="shuffle">
            Shuffle
            <v-icon>shuffle</v-icon>
          </v-btn>
          <v-btn outlined small color="green lighten-1" @click="$refs.fileUpload.click()">
            Import
            <v-icon>folder</v-icon>
            <input id='fileUpload' type="file" ref='fileUpload' @change="loadLocalFile($event)" hidden>
          </v-btn>
          <v-btn outlined small color="green lighten-1" @click="blankSheet">
            Blank
            <v-icon>create_new_folder</v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="results"
          @click:row="selectSong"
        >
          <template v-slot:items="props">
            <tr>
              <td class="text-xs-left">{{ props.item.title }}</td>
              <td class="text-xs-left">{{ props.item.artist }}</td>
              <td class="text-xs-right">{{ props.item.section }}</td>
              <!-- <td class="text-xs-right">{{ props.item.genres }}</td> -->
            </tr>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ term }}" found no results.
            </v-alert>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import Fuse from 'fuse.js'
import { createNamespacedHelpers } from 'vuex'
import { setTimeout } from 'timers'

const { mapActions, mapState, mapMutations } = createNamespacedHelpers('predict')
const { mapActions: seqMapActions } = createNamespacedHelpers('sequence')

export default {
  name: 'search-table',
  props: {
    searchLabel: {
      type: String,
      default: 'Choose a song...'
    }
  },
  data () {
    return {
      results: [],
      fuse: null,
      term: null,
      debounce: null,
      error: '',
      showDialog: false,
      headers: [
        {
          text: 'Title',
          align: 'left',
          value: 'title',
          width: '50%'
        },
        { text: 'Artist', width: '30%', align: 'left', value: 'artist' },
        { text: 'Section', width: '20%', align: 'right', value: 'section' }
        // { text: 'Genre', width: '20%', align: 'right', value: 'genres' }
      ]
    }
  },
  computed: {
    ...mapState(['songs', 'sid']),
    searchResults: {
      set (val) {
        if (this.debounce !== null) {
          this.debounce(val)
        }
      },
      get () {
        return null
      }
    }
  },
  watch: {
    songs () {
      this.loadSearch()
    }
  },
  methods: {
    ...mapActions(['fetchSongs', 'saveMidi']),
    ...seqMapActions(['loadMidiBuffer', 'clear']),
    ...mapMutations(['updateSID']),
    loadSearch () {
      if (this._.isEmpty(this.songs)) return
      if (this.fuse !== null) return
      const options = {
        shouldSort: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          'artist',
          'title'
        ]
      }
      this.fuse = new Fuse(this.songs, options)
      this.debounce = this._.debounce(this.updateSearch, 100)
      this.results = this.songs
      // this.searchResults = 'avicii'
    },
    blankSheet () {
      this.$router.push({ path: '/song/blank' })
      this.showDialog = false
    },
    restart () {
      this.$router.push({ path: `/song/${this.sid}` })
    },
    shuffle () {
      this.$router.push({ path: `/shuffle` })
      this.showDialog = false
    },
    selectSong (songItem) {
      this.$router.push({ path: `/song/${songItem.sid}` })
      this.showDialog = false
    },
    updateSearch (term) {
      if (this.fuse === null || this._.isEmpty(term) || this._.isEmpty(this.songs)) return
      setTimeout(() => {
        this.results = this.fuse.search(term, { limit: 50 })
      }, 0)
    },
    async loadLocalFile (event) {
      const file = this._.get(event, 'target.files[0]')
      const nameParts = this._.get(file, 'name', '').split('.')
      const ext = nameParts.pop()
      if (ext !== 'mid') {
        console.log('Error loading file', file)
        return
      }

      this.clear()
      const reader = new FileReader()
      reader.fileName = nameParts[0]
      reader.onload = e => this.loadMidiBuffer({ midiBuffer: e.target.result, seqName: e.target.fileName, savePrevious: false })
      reader.readAsArrayBuffer(file)

      setTimeout(async () => {
        const savedMidiID = await this.saveMidi()
        this.updateSID(savedMidiID)
        this.$router.push({ path: `/song/${savedMidiID}` })

        this.showDialog = false
      }, 1 * 1000)
    }
  },
  mounted () {
    this.fetchSongs()
  }
}

</script>

<style scoped lang="scss">

.v-btn {
  margin: 0px 5px;
}
</style>
