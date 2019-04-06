<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Predict</router-link> |
      <router-link to="/sheet">Sheet</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #42b983, // The primary color of your application
  accent: #bbdefb // The accent or secondary color
));

@import "~vue-material/dist/theme/all"; // Apply the theme

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
