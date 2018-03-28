<template>
  <v-app id="app">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      light
      absolute
      color="primary"
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile avatar tag="div">
          <router-link :to="{name: 'User', params: { login: viewer.login}}">
            <v-layout row align-center>
              <v-list-tile-avatar size="50" >
                <img :src="viewer.avatarUrl" >
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{viewer.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-layout>
          </router-link>
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" append replace :to="item.route">
          <v-list-tile-action >
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <div absolute class="text-sm-right">
        <v-divider light></v-divider>
        <v-btn v-if="$store.getters.getAuthState" v-on:click="logout" color="secondary" class="white--text">Logout</v-btn>
      </div>
    </v-navigation-drawer>
    <v-toolbar dark color="primary" extended>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" dark>
      </v-toolbar-side-icon>
      <router-link :to="{name: 'createRepo'}">
        <v-btn
          color="pink"
          dark
          small
          absolute
          bottom
          right
          fab
          class="mr-5"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
      <v-toolbar-title class="white--text title-gh">GitHub Client</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-select
        :items="searchableItems"
        v-model="selectedSearch"
        label="Select"
        single-line
        color="secondary"
      ></v-select>
      <v-text-field v-model="searchInput" color="secondary"></v-text-field>
      <router-link :to="{name: 'Search', params: {filter: selectedSearch.text, input: searchInput}}">
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </router-link>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
      </transition>
    </main>
    <v-card height="100px" flat v-if="$store.getters.getAuthState" style="background-color: transparent"  >
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
  </v-app>
</template>

<script>
  import gql from 'graphql-tag'
  import Vue from 'vue'
  import store from './store'
  Vue.use(require('vue-moment'))
  export default {

    name: 'app',
    data: () => ({
      selectedSearch: '',
      searchableItems: [
        { text: 'Repositories' },
        { text: 'Users' },
        { text: 'Code' },
        { text: 'Issues' }
      ],
      activeNav: store.getters.getActiveNav,
      drawer: null,
      items: [
        { title: 'Repositories', icon: 'code', route: '/repos' },
        { title: 'Issues', icon: 'info', route: '/issues' },
        { title: 'Gists', icon: 'description', route: '/gists' }
      ],
      mini: false,
      right: null,
      viewer: [],
      searchInput: ''
    }),
    apollo: {
      viewer: {
        query: gql`query {
                    viewer {
                      login
                      avatarUrl
                      name
                      email
                      location
                     }
                  }
                  `
      }
    },
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

  .title-gh {
    font-weight: 700;
  }

</style>
