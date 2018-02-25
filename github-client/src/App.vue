<template>
  <div id="app">
    <header>
      <span>GitHub Client</span>
      <button v-if="$store.getters.getAuthState" v-on:click="logout">Logout</button>
    </header>
    <main>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </transition>
    </main>
    <v-card height="200px" flat v-if="$store.getters.getAuthState" >
      <v-bottom-nav absolute :value="true" :active.sync="activeNav" color="white" class="footer--fixed" >
        <v-btn flat color="blue-grey" value="repositories" append replace to="/repos">
          <span>Repositories</span>
          <v-icon>code</v-icon>
        </v-btn>
        <v-btn flat color="blue-grey" value="issues" append replace to="/issues">
          <span>Issues</span>
          <v-icon>info</v-icon>
        </v-btn>
        <v-btn flat color="blue-grey" value="gists" append replace to="/gists">
          <span>Gists</span>
          <v-icon>description</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: () => ({
    links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
    activeNav: 'repositories'
  }),
  methods: {
    logout: function () {
      this.$store.dispatch('resetState')
      this.$router.push('/')
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #8AEA92;
  color: #2c3e50;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

ul {
  list-style-type: none;
}

a {
  color: inherit;
  text-decoration: none;
}
</style>
