<template>
  <div class="home">
    <div id='editor'>
      <div id='score'>
        <div id='pitch-lines'></div>
        <div id='bar-lines'></div>
        <div id='beat-lines'></div>
        <div id='sixteenth-lines'></div>
        <div id='notes'></div>
        <div id='parts'></div>
        <div id='playhead'>
            <div id='playhead-line'></div>
        </div>
      </div>
    </div>
    <div id='controls'>
      <input type='button' id='play' value='play' />
      <input type='button' id='stop' value='stop' />

      <div id='time-bars-beats'></div>

      <div class='pipe'>|</div>
      <div id='time-seconds'></div>

      <div class='pipe'>|</div>
      <div id='mouse-x'>0</div>

      <div class='pipe'>|</div>
      <div id='mouse-y'>0</div>

      <div class='pipe'>|</div>
      <input type='button' id='first' value='<<' />
      <input type='button' id='prev' value='<' />
      <div id='page-numbers'>page 0 of 0</div>
      <input type='button' id='next' value='>' />
      <input type='button' id='last' value='>>' />

      <div class='pipe'>|</div>
      <div>
        <input type='range' id='scale-slider'/>
        <label for='scale-slider' id='scale-label'>#bars 16</label>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import '../../public/js/heartbeat.js' // import heartbeat library

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted () {
    // import '../../public/js/main.js'
    require('../../public/js/main.js') // import needs to be at top level, so using require
  }
}
</script>

<style lang="scss">
@import '../../public/static/main.css';
@import '../../public/static/reset.css';
</style>
