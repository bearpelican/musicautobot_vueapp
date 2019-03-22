<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + Flask App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
// var heartbeat = require('../../public/js/heartbeat.js')
// var main = require('../../public/js/main.js')
require('../../public/js/heartbeat.js')
require('../../public/js/main.js')

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
@import '../../public/static/main.css';
@import '../../public/static/reset.css';
</style>
