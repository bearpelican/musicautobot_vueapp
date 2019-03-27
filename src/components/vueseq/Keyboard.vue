<template lang="pug">
  .keyboard
    key(
      v-for="(key, index) in keys",
      :key="index",
      :index="index",
      :keyType="key.type",
      :pitch="key.name"
    )
    .space
</template>

<script>
import { mapState } from 'vuex'
import Key from '@/components/vueseq/Key'
import { allKeys, getTypeOfKey } from '@/lib/getOctaves'

export default {
  components: {
    Key
  },
  data () {
    return {
      keys: allKeys.map(key => {
        return {
          type: getTypeOfKey(key),
          name: key
        }
      }).reverse()
    }
  },
  computed: mapState(['scrollPosition']),
  watch: {
    scrollPosition () {
      this.$el.scrollTop = this.scrollPosition
    }
  }
}
</script>

<style scoped>
.keyboard {
  width: 100px;
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
}
.space {
  height: 100px;
}
</style>
