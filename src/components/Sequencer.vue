<template lang="pug">
  #sequencer
    .input(id="sequence-title" v-model="seqName" class="form-input")
    section
      keyboard
      score
      button-container
</template>

<script>
import Keyboard from '@/components/vueseq/Keyboard'
import Score from '@/components/vueseq/Score'
import ButtonContainer from '@/components/controls/ButtonContainer'
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')
// import "./style.css";

export default {
  name: 'sequencer',
  components: {
    Keyboard,
    Score,
    ButtonContainer
  },
  data () {
    // return {
    //   seqName: 'dsjfkdlsfjsdk'
    // }
  },
  computed: {
    ...mapState(['name']),
    seqName: {
      set (name) { this.updateName(name) },
      get () { return this.name }
    }
  },
  methods: {
    ...mapActions(['updateName'])
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

#sequence-title {
  display: inline-block;
  width: 50%;
  height: 40px;
  transition: all 0.3s ease-out;
  text-align: center;
  font-size: 2em;
  border: none;
}
</style>
