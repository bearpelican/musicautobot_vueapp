<template lang="pug">
  .header-controls
    search-table.header-container
    sequence-title.header-container
    .header-container
      v-btn(outlined small color="green lighten-1" @click="exportMidi") Save
      v-btn(outlined small color="green lighten-1" @click="share") Share
    .playback-version
      v-btn-toggle.control-group-toggle(v-model="selectPlaybackVersion")
        v-btn(text value="prediction" color="red") Prediction
        v-btn(text value="original" color="green") Original
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
    ...mapState(['appState', 'playbackVersion']),
    selectPlaybackVersion: {
      set (playbackVersion) { this.updatePlaybackVersion({ playbackVersion }) },
      get () { return this.playbackVersion }
    }
  },
  watch: {
  },
  methods: {
    ...mapActions(['exportMidi', 'clear', 'updatePlaybackVersion']),
    share () {
      const url = window.location.href
      const text = `Check out this song I just generated with #musicautobot`
      window.open('http://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0')
    }
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

.header-container {
  margin-top: auto;
  min-width: 250px;
  .v-btn {
    margin: 0px 5px;
    float: right;
  }
}

.song-controls {
  display: flex;
}

.dialog-controls {
  display: flex;
  height: 200px;
}

.header-controls {
  display: flex;
  justify-content: space-between;
}

.control-group-toggle {
  margin-left: 5px;
  background: #fafafafa;
  .v-btn {
    height: 20px;
    font-size: .8em;
  }
}

.playback-version {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 80px;
  z-index: 6;
}

</style>
