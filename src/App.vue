<template>
  <v-app id="app">
    <router-view />
    <div id="nav">
      <router-link
        to="/"
        :class="{ 'router-link-active': isDefaultRoute }"
      >
        Playground
      </router-link> |
      <!-- <router-link to="/sheet">Sheet</router-link> | -->
      <router-link to="/about">
        About
      </router-link>
    </div>
  </v-app>
</template>

<script>

export default {
  computed: {
    isDefaultRoute () {
      return (['song', 'predict', undefined].includes(this.$route.name))
    }
  }
}

</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  background-color: #ffffff;
}
#nav {
  padding-top: 10px, 0px;
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #858f97;
    margin: 0px 10px;
    &.router-link-active {
      color: #42b983;
    }
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
