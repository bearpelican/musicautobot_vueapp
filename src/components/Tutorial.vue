
<template>
  <div class="tutorial-start">
    <!-- https://codepen.io/ahebler/pen/YXJJWb?editors=1111 -->
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 43.1 85.9"
      style="enable-background:new 0 0 43.1 85.9;"
      xml:space="preserve"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        class="st0 draw-arrow"
        d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        class="draw-arrow tail-1"
        d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        class="draw-arrow tail-2"
        d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9"
      />
    </svg>
    <div class="tutorial-text">
      <!-- <p>Select a song to start generating music from!</p> -->
      <!-- <p>Some search hints... Bach, EDM, La Bamba, etc.</p> -->
      <p class="tutorial-header">
        Choose a song to start.
      </p>
      <p class="tutorial-p">
        We'll use this to generate new music in the same style!
      </p>
    </div>
  </div>
</template>

<script>

// import { createNamespacedHelpers } from 'vuex'
// const { mapState } = createNamespacedHelpers('predict')

export default {
  // props: {
  //   value: String
  // },
  // computed: {
  //   ...mapState(['seedLen', 'songItem']),
  //   left () {
  //     return `${this.seedLen * pixelPerBeat}px`
  //   },
  //   hidden () {
  //     return this._.isEmpty(this.songItem)
  //   }
  // }
}
</script>

<style lang='scss' scoped>

.tutorial-start {
  // position: relative;
  float: left;
  margin-left: 180px;

  .tutorial-text {
    // position:relative;
    display: inline-block;
    margin-top: 130px;

    .tutorial-header {
      font-size: 2em;
      margin-bottom: 10px;
    }
    .tutorial-p {
      font-size: 1em;
      margin: 0;
    }
  }

  opacity: 0;
  animation-delay: 1s;
  animation-duration: 2.0s;
  animation-fill-mode: forwards;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
svg {
  width: 200px;
  height: 200px;
  margin: 0 auto;

  transform: scale(1, -1) rotate(60deg);
  float: left;

  .draw-arrow {
    stroke-width: 3;
    // stroke: dodgerblue;
    stroke: #6ee4af;
    fill: none;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;

    animation-delay: 2s;
    animation-duration: 2.0s;
    animation-fill-mode: forwards;
    animation-name: draw;

    &.tail-1 {
      animation-delay: 2.5s;
    }
    &.tail-2 {
      animation-delay: 2.7s;
    }
  }
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
