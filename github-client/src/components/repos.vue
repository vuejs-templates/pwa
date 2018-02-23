<template>
  <div>
    <ul>
      <li v-for="repo in viewer.repositories.nodes.slice().reverse()">
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-card ripple tile append replace to="/singleRepo">
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
          </v-flex>
        </v-layout>
      </li>
    </ul>
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
                       repositories(last: $number_of_repos) {
                         nodes {
                          name
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
    }
  }
</script>

<style scoped>

</style>
