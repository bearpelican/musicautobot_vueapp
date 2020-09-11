<template>
  <div class="sheet">
    <div id="sheet-container" />
    <!-- <button v-on:click='updateSheet'>Reload</button> -->
  </div>
</template>

<script>
// @ is an alias to /src

import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
// require('opensheetmusicdisplay')
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('predict')
const { mapState: seqMapState } = createNamespacedHelpers('sequence')

export default {
  name: 'Sheet',
  components: {
  },
  data () {
    console.log(OpenSheetMusicDisplay)
    return {
      osmd: null,
      containerWidth: 720
      // osmd: new opensheetmusicdisplay.OpenSheetMusicDisplay("sheet-container")
    }
  },
  computed: {
    ...seqMapState(['notes'])
  },
  mounted () {
    console.log(OpenSheetMusicDisplay)
    this.osmd = new OpenSheetMusicDisplay('sheet-container', { drawingParameters: 'compact', drawPartNames: false })
    // this.loadSheet('./audio/sample/chorus_key_cmajor.xml')
    this.updateSheet()
  },
  methods: {
    ...mapActions(['convertToXML']),
    loadSheet (musicXML) {
      // this.osmd.load(musicXML, {autoResize: true})
      this.osmd.load(musicXML)
        .then(() => {
          this.containerWidth = 900
          this.osmd.render()
        })
    },
    async updateSheet () {
      if (this._.isEmpty(this.notes)) {
        return
      }
      const musicXML = await this.convertToXML()
      // this.osmd.load(musicXML, {autoResize: true})
      this.osmd.load(musicXML)
        .then(() => {
          this.containerWidth = 900
          this.osmd.render()
        })
    }
  }
}
</script>

<style lang="scss">

</style>
