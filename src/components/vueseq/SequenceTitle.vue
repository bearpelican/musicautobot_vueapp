<template lang="pug">
  div
    label#version {{ `(v${version}) ` }}

      // note(
      //   v-for="(note, index) in notes",
      //   :key="index + '-note'",
      //   :index="index",
      //   :storeKeyNumber="note.key",
      //   :storeTiming="note.timing",
      //   :storeLength="note.length"
      // )

    md-field#version2
      md-select(v-model="selectedVersion")
        md-option(:value="version") {{ versionString(version) }}
        md-option(v-for="(snapshot, index) in history" :value="snapshot.version") {{ versionString(snapshot.version) }}
    span(contenteditable="true" id="sequence-title-span" ref='editableTitle' @blur="updateSeqName($event.target.textContent)")
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
        this.updateVersion(noteTemp)
      },
      get () { return this.version }
      // get () { return `(v${this.version}) ` }
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

#version2 {

  /* margin-right: 10px; */
  width: 40px;
  display: inline-block;
  margin: 0;
  margin-right: 10px;

  .md-input {
    color: #489e77;
    -webkit-text-fill-color: unset;
    font-size: 1.6em;
  }
  span .md-item-list-text {
    font-size: 1.2em;
  }
  .md-menu {
    .md-icon {
      display: none;
    }
  }
}

// #version2 * {
//   -webkit-text-fill-color: unset;
//   font-size: 1.6em;
// }

#version2::after {
  display: none;
}

#version {
  font-size: 1.6em;
  color: #489e77;
  margin-right: 10px;
}
#sequence-title-span {
  display: inline-block;
  transition: all 0.3s ease-out;
  text-align: center;
  font-size: 1.6em;
  border: none;
  padding-bottom: 10px;
}

</style>
