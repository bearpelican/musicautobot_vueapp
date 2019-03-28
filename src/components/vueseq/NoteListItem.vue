<template lang="pug">
  md-button.md-fab.md-mini.md-clean.button(@click.native="click")
    | {{ note.font }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('sequence')

export default {
  props: {
    note: Object
  },
  methods: {
    ...mapActions([
      'updateCurrentNote'
    ]),
    click () {
      this.updateCurrentNote(this.note)
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
