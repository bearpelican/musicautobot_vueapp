<template>
  <div class="sheet">
    <div id="sheet-container"> </div>
    <button v-on:click='updateSheet'>Reload</button>
  </div>
</template>

<script>
// @ is an alias to /src

import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
// require('opensheetmusicdisplay')
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('predict')

export default {
  name: 'sheet',
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

  },
  mounted () {
    console.log(OpenSheetMusicDisplay)
    this.osmd = new OpenSheetMusicDisplay('sheet-container', { drawingParameters: 'compact' })
    // this.loadSheet('./audio/sample/chorus_key_cmajor.xml')
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
