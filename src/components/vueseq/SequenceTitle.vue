<template lang="pug">
  div
    label#version {{ `(v${version}) ` }}
    span(contenteditable="true" id="sequence-title-span" ref='editableTitle' @blur="updateSeqName($event.target.textContent)")
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')
// import "./style.css";

export default {
  name: 'sequence-title',
  watch: {
    seqName (val) {
      console.log('Seq name changed:', val)
      this.$refs.editableTitle.textContent = val
    }
  },
  computed: {
    ...mapState(['seqName', 'version'])
  },
  methods: {
    ...mapActions(['updateSeqName'])
  },
  mounted () {
    this.$refs.editableTitle.textContent = this.seqName
  }
}
</script>

<style scoped>

#version {
  font-size: 2em;
  color: #489e77;
  margin-right: 10px;
}
#sequence-title-span {
  display: inline-block;
  transition: all 0.3s ease-out;
  text-align: center;
  font-size: 2em;
  border: none;
}

</style>
