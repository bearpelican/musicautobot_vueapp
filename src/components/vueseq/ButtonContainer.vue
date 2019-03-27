<template lang="pug">
  .container
    md-button.md-icon-button.md-raised.md-accent
      md-icon list
    note-list
    play-button
</template>

<script>
import NoteList from '@/components/vueseq/NoteList'
import PlayButton from '@/components/vueseq/PlayButton'

export default {
  components: {
    NoteList,
    PlayButton
  }
}
</script>

<style scoped>
img {
  max-height: 30px;
}

.container {
  position: absolute;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  pointer-events: none;
}

.container > * {
  pointer-events: all;
}

.md-fab-bottom-right {
  position: static;
}

.md-icon-button {
  width: 56px;
  height: 56px;
}
</style>
