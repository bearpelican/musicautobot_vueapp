<template>
  <div class="sheet">
    <!-- <div id="sheet-container" :style="{ width: containerWidth + 'px'}"> </div> -->
    <div id="sheet-container"> </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
// require('opensheetmusicdisplay')

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
    this.loadSheet('./audio/sample/chorus_key_cmajor.xml')
  },
  methods: {
    loadSheet (musicXML) {
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
