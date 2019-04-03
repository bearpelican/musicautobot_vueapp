<template>
    <div class="flex-result">
      Number steps:<input v-model.number='selectSteps' type='number'>
      Seed Length:<input v-model.number='selectSeed' type='number'>
      <!-- <button v-on:click='predictMidi'>Predict</button> -->
      <button v-on:click='predictMidiLocal'>Predict</button>
      <!-- <button v-on:click='predictMidiDirect'>Predict</button> -->
    </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapMutations, mapState } = createNamespacedHelpers('predict')

export default {
  name: 'song-meta',
  data () {
    return {
      error: ''
    }
  },
  computed: {
    ...mapState(['nSteps', 'seedLen']),
    selectSteps: {
      set (steps) { this.updateSteps(steps) },
      get () { return this.nSteps }
    },
    selectSeed: {
      set (seedLen) { this.updateSeedLen(seedLen) },
      get () { return this.seedLen }
    }
  },
  methods: {
    ...mapMutations(['updateSteps', 'updateSeedLen']),
    ...mapActions(['predictMidi', 'predictMidiDirect', 'predictMidiLocal'])
  },
  mounted () {
  },
  components: {
  }
}

</script>
