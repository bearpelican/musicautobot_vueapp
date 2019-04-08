<template lang="pug">
  .container
    file-controls
    predict-controls
    sequence-controls
</template>

<script>
import NoteList from '@/components/controls/NoteList'
import SequenceControls from '@/components/controls/SequenceControls'
import FileControls from '@/components/controls/FileControls'
import PredictControls from '@/components/controls/PredictControls'

export default {
  components: {
    NoteList,
    SequenceControls,
    FileControls,
    PredictControls
  }
}
</script>

<style lang='scss'>

.container {
  /* background-color: #ffa07a; */

  .control-group {
    height: 140px;
    width: 160px;
    border-radius: 16px;
    background-color: #ffffff;
    transition: none;

    &.v-btn--active:before,
    &.v-btn:focus:before,
    &.v-btn:hover:before {
      background-color: white;
    }
    &.v-btn:focus {
      outline: none;
    }
  }

  .control-group-slider {
    width: 120px;
    margin: auto;
    padding: 0px;
  }

  .control-group-label {
    font-size: 0.8rem;
    color: #222222;
    margin-bottom: 0px;
  }

  .control-group-header {
    font-size: 0.8rem;
    // color: #42b983;
    margin: 5px 0px;
    /* background-color: #ff743d80; */
  }

  .md-speed-dial {
    width: 65px;
  }

  // .btn-outline-primary {
  //   background-color: red;
  // }
}

</style>

<style scoped lang='scss'>
img {
  max-height: 30px;
}

.container {
  position: absolute;
  top: 180px;
  right: 100px;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
  pointer-events: none;
  z-index: 3;
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
