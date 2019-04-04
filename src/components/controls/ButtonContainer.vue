<template lang="pug">
  .container
    // md-button.md-icon-button.md-raised.md-accent
    //   md-icon list
    // note-list
    file-controls
    predict-controls
    play-button
</template>

<script>
import NoteList from '@/components/controls/NoteList'
import PlayButton from '@/components/controls/PlayButton'
import FileControls from '@/components/controls/FileControls'
import PredictControls from '@/components/controls/PredictControls'

export default {
  components: {
    NoteList,
    PlayButton,
    FileControls,
    PredictControls
  }
}
</script>

<style>
.container .md-button {
  background-color: #ffa07a80;
  /* background-color: #ffa07a; */
}
</style>

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
