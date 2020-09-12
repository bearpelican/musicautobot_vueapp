
<template>
  <div class="loading-outer">
    <div class="loading-inner">
      <v-progress-circular
        indeterminate
        color="green accent-3"
        :size="40"
      />
      <label>{{ value }}</label>
      <v-progress-circular
        indeterminate
        color="green accent-3"
        :size="40"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    value: { type: String, default: null }
  },
  computed: {

  }
}
</script>

<style lang='scss' scoped>
.loading-inner {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
}
.loading-outer {
  background-color: #ffffff88;
}
div {
  label {
    font-size: 2em;
    height: 100%;
    margin: 10px 20px;
  }

  .v-progress-circular {
    margin-bottom: 10px;
  }

  opacity: 0;
  // animation-delay: 1s;
  animation-duration: 1.0s;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

</style>
