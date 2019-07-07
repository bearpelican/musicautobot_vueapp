<template lang="pug">
  .keyboard
    key(
      v-for="(key, index) in keys",
      :key="index",
      :index="index",
      :keyType="key.type",
      :pitch="key.name"
    )
    //- .space
</template>

<script>
import Key from '@/components/vueseq/Key'
import { allKeys, getTypeOfKey } from '@/lib/getOctaves'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('sequence')

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
  computed: mapState(['scrollTopPosition']),
  watch: {
    scrollTopPosition () {
      this.$el.scrollTop = this.scrollTopPosition
    }
  }
}
</script>

<style scoped>
.keyboard {
  width: 70px;
  float: left;
  /* overflow: hidden; */
  position: relative;
}
</style>
