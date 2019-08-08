<template lang="pug">
  .footer-controls
    sequence-controls#sequence-controls
    regen-controls#regen-controls
    predict-controls#predict-controls
</template>

<script>
import SequenceControls from '@/components/controls/SequenceControls'
import RegenControls from '@/components/controls/RegenControls'
import PredictControls from '@/components/controls/PredictControls'

export default {
  components: {
    SequenceControls,
    RegenControls,
    PredictControls
  }
}
</script>

<style lang='scss'>

.footer-controls {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100px;
  margin-top: 10px;

  .control-group-content {
    display: flex;
  }

  .control-group-slider {
    width: 120px;
    margin: auto;
    // padding: 0px;
  }

  .control-group-control {
    margin: 0px 10px;
  }

  .control-group-label {
    font-size: 0.8rem;
    color: #222222;
    margin-bottom: 0px;
    margin-top: 0px;
  }

  .control-group-header {
    margin: 5px 0px;
  }
}

</style>
