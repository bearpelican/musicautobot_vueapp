<template lang="pug">
  md-button.md-fab.md-mini.md-clean.button(@click.native="click")
    | {{ noteLength.font }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('sequence')

export default {
  props: {
    noteLength: Object
  },
  methods: {
    ...mapActions([
      'updateCurrentLength'
    ]),
    click () {
      this.updateCurrentLength(this.noteLength)
    }
  }
}
</script>

<style scoped>
.button {
  font-family: "notes";
  font-size: 20px;
}
</style>
