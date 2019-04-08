
<template>
  <div class="tutorial-two">
    <!-- https://codepen.io/ahebler/pen/YXJJWb?editors=1111 -->
    <!-- <svg class='arrow-generate' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 43.1 85.9" style="enable-background:new 0 0 43.1 85.9;" xml:space="preserve">
      <path stroke-linecap="round" stroke-linejoin="round" class="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
      <path stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
      <path stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
    </svg> -->
    <svg class='arrow-play' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 43.1 85.9" style="enable-background:new 0 0 43.1 85.9;" xml:space="preserve">
      <path id="ap" stroke-linecap="round" stroke-linejoin="round" class="st0 draw-arrow" d="M11.3,2.5c-5.8,5-8.7,12.7-9,20.3s2,15.1,5.3,22c6.7,14,18,25.8,31.7,33.1" />
      <path id="ap-t1" stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-1" d="M40.6,78.1C39,71.3,37.2,64.6,35.2,58" />
      <path id="ap-t2" stroke-linecap="round" stroke-linejoin="round" class="draw-arrow tail-2" d="M39.8,78.5c-7.2,1.7-14.3,3.3-21.5,4.9" />
    </svg>

    <svg class='arrow-generate' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 120 100" style="enable-background:new 0 0 120 100;" xml:space="preserve">
      <path stroke="null" id="ag" d="m11.076091,12.500004c56.035746,-3.602122 67.399242,0.71061 74.550715,17.915384c0.297942,1.864719 6.050072,27.60371 4.645055,63.484612" class="st0 draw-arrow" stroke-linejoin="round" stroke-linecap="round"/>
      <path id="ag-t1" d="m91.6,95.1c6.4,-7.8 8.6,-9.5 12.6,-14.1" class="draw-arrow tail-1" stroke-linejoin="round" stroke-linecap="round"/>
      <path stroke="null" id="ag-t2" d="m89.8,95.5c-7.2,-5.3 -10.3,-10.7 -14.5,-13.1" class="draw-arrow tail-2" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>
    <p class='tutorial-choose'>Great choice.</p>
    <p class='tutorial-generate'>Click to generate new music!</p>
    <p class='tutorial-play'>Click to listen!</p>
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

.tutorial-two {
  // position: relative;
  float: left;
  text-align: left;
  margin-right: 0px;
  font-size: 2em;
  right: 0px;
  bottom: 0px;
  width: 55%;
  height: 55%;

  p {
    opacity: 0;
    animation-delay: 1s;
    animation-duration: 2.0s;
    animation-fill-mode: forwards;
    animation-name: fadeIn;
  }

  .tutorial-choose {
    position: absolute;
    display: inline-block;
    animation-delay: 1s;
  }
  .tutorial-generate {
    position: absolute;
    display: inline-block;
    width: 500px;
    right: 350px;
    bottom: 270px;
    animation-delay: 2s;
  }
  .tutorial-play {
    position: absolute;
    right: 400px;
    bottom: 150px;
    display: inline-block;
    animation-delay: 4s;
  }

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
  // bottom: 0px;
  // transform: scale(1, -1) rotate(60deg);
  float: right;

  &.arrow-generate {
    transform: rotate(-5deg);
    position: absolute;
    right: 150px;
    bottom: 105px;
    width: 300px;
    height: 230px;
  }
  &.arrow-play {
    transform: rotate(-45deg);
    position: absolute;
    right: 320px;
    bottom: 0px;
    // transform: scale(-1, 1) rotate(55deg);
  }
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

// Custom timings
#ap {
  animation-delay: 4.5s;
}
#ap-t1 {
  animation-delay: 5s;
}
#ap-t2 {
  animation-delay: 5.2s;
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
