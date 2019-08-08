<template>
  <div class="home">
    <About msg="Music Autobot"/>
  </div>
</template>

<script>
// @ is an alias to /src
import About from '@/components/About.vue'

export default {
  name: 'home',
  components: {
    About
  }
}
</script>

<style lang="scss">

</style>
