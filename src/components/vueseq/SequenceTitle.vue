<template lang="pug">
  div
    // label#version {{ `(v${version}) ` }}

    // v-menu#version2
    //   template(v-slot:activator="{ on }")
    //     v-btn(color="clear" v-on="on") {{ versionString(version)}}
    //   v-list
    //     v-list-tile(v-for="(item, index) in history" :key="index" @click="")
    //       v-list-tile-title {{ versionString(item.version) }}
    span(contenteditable="true" id="sequence-title-span" ref='editableTitle' @blur="updateSeqName($event.target.textContent)")

    label#sequence-type {{ sequenceType }}
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('sequence')

export default {
  name: 'sequence-title',
  data () {
    return {
    }
  },
  watch: {
    seqName (val) {
      console.log('Seq name changed:', val)
      this.$refs.editableTitle.textContent = val
    }
  },
  computed: {
    ...mapState(['seqName', 'version', 'history']),
    selectedVersion: {
      set (version) {
        this.updateVersion(version)
      },
      get () { return this.version }
      // get () { return `(v${this.version}) ` }
    },
    sequenceType () {
      if (this.$route.name === 'predict') return '(Generated)'
      if (this.$route.name === 'song') return '(Original)'
      return ''
    }
  },
  methods: {
    ...mapActions(['updateSeqName']),
    versionString (version) {
      return `(v${version})`
    }
  },
  mounted () {
    this.$refs.editableTitle.textContent = this.seqName
  }
}
</script>

<style lang='scss'>

// #version2 {

//   /* margin-right: 10px; */
//   width: 40px;
//   display: inline-block;
//   margin: 0;
//   margin-right: 10px;

//   .md-input {
//     color: #489e77;
//     -webkit-text-fill-color: unset;
//     font-size: 1.2em;
//   }
//   span .md-item-list-text {
//     font-size: 1.2em;
//   }
//   .md-menu {
//     .md-icon {
//       display: none;
//     }
//   }
// }

// #version2::after {
//   display: none;
// }

// #version {
//   font-size: 1.6em;
//   color: #489e77;
//   margin-right: 10px;
// }

#sequence-type {
  font-size: 1.2em;
  color: #489e77;
  margin-left: 15px;
}

#sequence-title-span {
  display: inline-block;
  transition: all 0.3s ease-out;
  text-align: center;
  font-size: 1.2em;
  border: none;
  margin-bottom: 5px;
}

</style>
