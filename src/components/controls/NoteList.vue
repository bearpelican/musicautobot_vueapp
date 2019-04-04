<template lang="pug">
  md-speed-dial.md-fab-bottom-right(md-mode="scale")
    md-button.md-fab.note-preview(md-fab-trigger)
      | {{ currentLength.font }}
    note-list-item(
      v-for="(noteLength, index) in noteLengths",
      :key="index"
      :noteLength="noteLength"
    )
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import NoteListItem from '@/components/controls/NoteListItem'
import noteLengths from '@/lib/getNotes'
const { mapState } = createNamespacedHelpers('sequence')

export default {
  components: {
    NoteListItem
  },
  data () {
    return { noteLengths }
  },
  computed: {
    ...mapState([
      'currentLength'
    ])
  }
}
</script>

<style scoped>
.note-preview {
  font-family: "notes";
  font-size: 20px;
}
</style>
