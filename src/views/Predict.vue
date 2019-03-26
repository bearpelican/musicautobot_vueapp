<template>
  <div class="predict">
    <form class="form-inline md-form form-sm active-purple-2 mt-2">
        <input class="form-control form-control-sm mr-3 w-75" type="text" placeholder="Search" aria-label="Search">
        <i class="fas fa-search" aria-hidden="true"></i>
    </form>

    <h1>Backend Resources Demo</h1>
    <p>Click on the links below to fetch data from the Flask server</p>
    <a href="" @click.prevent="fetchResource">Fetch</a><br/>
    <a href="" @click.prevent="fetchSecureResource">Fetch Secure Resource</a>
    <h4>Results</h4>
    <p v-for="r in resources" :key="r.timestamp">
      Server Timestamp: {{r.timestamp | formatTimestamp }}
    </p>
    <p>{{error}}</p>
  </div>
</template>

<script>

import $backend from '../backend'

export default {
  name: 'predict',
  data () {
    return {
      resources: [],
      error: ''
    }
  },
  methods: {
    searchSongs () {
      $backend.fetchResource()
        .then(responseData => {
          this.resources.push(responseData)
        }).catch(error => {
          this.error = error.message
        })
    },
    fetchSecureResource () {
      $backend.fetchSecureResource()
        .then(responseData => {
          this.resources.push(responseData)
        }).catch(error => {
          this.error = error.message
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
    }
  }
}

</script>

<style lang="scss">

.active-purple-2 input[type=text]:focus:not([readonly]) {
    border-bottom: 1px solid #ce93d8;
    box-shadow: 0 1px 0 0 #ce93d8;
}

</style>
