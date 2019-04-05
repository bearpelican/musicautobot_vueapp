<template lang="pug">
  #sequencer
    section
      keyboard
      score
    button-container
</template>

<script>
import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import ButtonContainer from '@/components/controls/ButtonContainer'
// import "./style.css";

export default {
  name: 'sequencer',
  components: {
    Keyboard,
    Score,
    ButtonContainer
  }
}
</script>

<style scoped>

@font-face {
  font-family: "notes";
  src: "@/assets/notes.woff";
}

#sequencer * {
  user-select: none;
  /* overflow: hidden; */
  /* position: relative; */
}
section {
  /* width: 80%;
  height: 50%; */
  margin: 0px 100px;
}
</style>
