
<template>
  <div
    class="tutorial-predict"
    @click="dismiss"
  >
    <!-- https://codepen.io/ahebler/pen/YXJJWb?editors=1111 -->
    <svg
      class="arrow-generate"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 120 100"
      style="enable-background:new 0 0 120 100;"
      xml:space="preserve"
    >
      <path
        id="ag"
        stroke="null"
        d="m11.076091,12.500004c56.035746,-3.602122 67.399242,0.71061 74.550715,17.915384c0.297942,1.864719 6.050072,27.60371 4.645055,63.484612"
        class="st0 draw-arrow"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <path
        id="ag-t1"
        d="m91.6,95.1c6.4,-7.8 8.6,-9.5 12.6,-14.1"
        class="draw-arrow tail-1"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <path
        id="ag-t2"
        stroke="null"
        d="m89.8,95.5c-7.2,-5.3 -10.3,-10.7 -14.5,-13.1"
        class="draw-arrow tail-2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
    <div id="tutorial-generate">
      <p>Time to generate new music!</p>
      <p id="tutorial-generate-subtext">
        Click me to remix!
      </p>
    </div>
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('predict')

export default {
  mounted () {
    setTimeout(() => {
      this.updateTutorialStep(2)
    }, 16 * 1000)
  },
  methods: {
    ...mapMutations(['updateTutorialStep']),
    dismiss () {
      this.updateTutorialStep(2)
    }
  }
}
</script>

<style lang='scss' scoped>

.tutorial-two {
  // position: relative;
  float: left;
  text-align: center;
  text-shadow: 1px 1px 12px #a7a7a7;
  margin-right: 0px;
  // pointer-events: none;
  bottom: 0px;
  width: 100%;
  height: 100%;

  p {
    opacity: 0;
    animation-delay: 1s;
    animation-duration: 2.0s;
    animation-fill-mode: forwards;
    animation-name: fadeIn;
  }
  #tutorial-generate {
    position: absolute;
    display: inline-block;
    font-size: 2em;
    top: 210px;
    left: 250px;
    animation-delay: 2s;
  }
}

#tutorial-generate-subtext {
  // margin
  font-size: .5em;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

svg {
  margin: 0 auto;
  float: right;

  &.arrow-generate {
    transform: rotate(65deg) scale(1, -1);
    position: absolute;
    left: 415px;
    top: 255px;
    width: 250px;
    height: 230px;
  }
  &.arrow-play {
    transform: rotate(-45deg);
    position: absolute;
    left: 280px;
    bottom: 20px;
    width: 100px;
    height: 100px;
    transform: scale(-1, 1) rotate(-30deg);
  }
  .draw-arrow {
    stroke-width: 3.5;
    // stroke: dodgerblue;
    stroke: #67d6a4;
    fill: none;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;

    animation-delay: 2s;
    animation-duration: 2.0s;
    animation-fill-mode: forwards;
    animation-name: draw;

    animation-delay: 2s;
    &.tail-1 {
      animation-delay: 2.5s;
    }
    &.tail-2 {
      animation-delay: 2.7s;
    }
  }
}

// Custom timings
#ag {
  animation-delay: 2.5s;
}
#ag-t1 {
  animation-delay: 3s;
}
#ag-t2 {
  animation-delay: 3.2s;
}

@keyframes draw {
 to {
    stroke-dashoffset: 0;
  }
}

// DEMO
// body {
//   padding: 20px;
//   text-align: center;
//   background-color: #222;
// }

</style>
