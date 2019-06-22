<template>
  <v-app id="app">
    <router-view/>
    <div id="nav">
      <router-link to="/">Predict</router-link> |
      <router-link to="/sheet">Sheet</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </v-app>
</template>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
