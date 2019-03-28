<template lang="pug">
  #app
    section
      keyboard
      score
    button-container
</template>

<script>
import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import ButtonContainer from '@/components/vueseq/ButtonContainer'
import store from '@/store'
// import "./style.css";

export default {
  name: 'midi',
  components: {
    Keyboard,
    Score,
    ButtonContainer
  },
  store
}
</script>

<style scoped>

@font-face {
  font-family: "notes";
  /* src: url("../assets/notes.woff") */
  src: "@/assets/notes.woff";
}

#app * {
  user-select: none;
}

#app {
  overflow: hidden;
  position: relative;
}
section {
  width: 100%;
  height: 100%;
}
</style>
