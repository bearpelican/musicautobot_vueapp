<template>
  <v-tooltip right>
    <template #activator="{ on }">
      <v-btn
        :id="buttonID"
        color="blue darken-2"
        dark
        fab
        large
        v-on="on"
        @click="toggle"
      >
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <div>Play it back!</div>
  </v-tooltip>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')
const { mapMutations: predMapMutations } = createNamespacedHelpers('predict')

export default {
  props: {
    buttonID: { type: String, required: true }
  },
  computed: {
    ...mapState(['appState']),
    icon () {
      return this.appState === 'playing' ? 'stop' : 'play_arrow'
    }
  },
  methods: {
    ...mapActions(['play', 'stop']),
    ...predMapMutations(['updateTutorialStep']),
    toggle () {
      this.updateTutorialStep(2)
      if (this.appState === 'editing') {
        this.play()
      } else {
        this.stop()
      }
    }
  }
}
</script>
