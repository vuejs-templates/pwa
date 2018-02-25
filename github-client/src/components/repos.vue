<template>
  <div
    id="e3"
    style="max-width: 85vh; margin: auto;"
    class=" lighten-3"
  >
    <v-container
      fluid
      style="min-height: 0;"
      grid-list-lg
    >
      <v-layout row wrap>
        <v-flex xs12>
      <ul>
        <li v-for="repo in viewer.repositories.nodes.slice().reverse()">
          <router-link :to="{name: 'singleRepo', params: { owner: viewer.login, name: repo.name }}">
              <v-card ripple tile append replace style="width: 75vh;">
                <v-card-title primary-title>
                  <div >
                    <p class="headline text-sm-left">{{repo.name}}</p>
                    <p class="grey--text text-sm-left">Created {{ repo.createdAt | moment("from") }}</p>
                    <p class="grey--text text-sm-left">Forks: {{repo.forks.totalCount}}</p>
                    <p class="grey--text text-sm-left">Disk Usage: {{repo.diskUsage}}</p>
                    <ul class="text-sm-left">
                      <li v-for="lang in repo.languages.nodes">
                        <div class="text-xs-center">
                          <v-chip v-bind:color="lang.color">{{lang.name}}</v-chip>
                        </div>
                      </li>
                    </ul>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>
                    <p v-if="repo.description">{{repo.description}}</p>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat>Fork</v-btn>
                  <!--<v-btn flat color="purple">Explore</v-btn>-->
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
          </router-link>
        </li>
      </ul>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import Vue from 'vue'
  Vue.use(require('vue-moment'))
  export default {
    name: 'repos',
    data () {
      return {
        viewer: [],
        show: false
      }
    },
    apollo: {
      viewer: {
        query: gql`query($number_of_repos:Int!) {
                    viewer {
                      name
                      login
                       repositories(last: $number_of_repos) {
                         nodes {
                          name
                          id
                          description
                          stargazers {
                            totalCount
                          },
                          createdAt,
                          forks {
                            totalCount
                          },
                          diskUsage,
                          languages (first: 1) {
                            nodes {
                              name,
                              color
                            }
                          }
                         }
                       }
                     }
                  }
                `,
        variables: {
          number_of_repos: 100
        }
      }
    },
    methods: {
      goToSingleRepo: function (repoName) {
        this.$router.go('/singleRepo/' + this.viewer.name + '/' + repoName)
      }
    }
  }
</script>

<style scoped>


</style>
