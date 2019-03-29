<template lang="pug">
  #app
    section
      keyboard
      score
    button-container
    <div id='tp' class='tp'></div>
</template>

<script>
import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import ButtonContainer from '@/components/vueseq/ButtonContainer'
// import "./style.css";
import { createNamespacedHelpers } from 'vuex'
import Tone from 'tone'
const { mapActions } = createNamespacedHelpers('sequence')

export default {
  name: 'midi',
  components: {
    Keyboard,
    Score,
    ButtonContainer
  },
  methods: {
    ...mapActions(['loadMidiFile']),
    bindTone () {
      console.log(document.querySelector('.tp'))
      // document.querySelector(".tp").bind(Tone.Transport);
      // document.querySelector(".tp").addEventListener("position", e => {
      //   console.log('Position changed')
      //   document.querySelector("#progress").style = `left: ${e.detail*100}%`;
      // });
    }
  },
  mounted () {
    this.loadMidiFile()
    this.bindTone()
  }
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
