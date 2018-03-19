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
            <li v-for="gist in viewer.gists.nodes.slice().reverse()">
              <router-link :to="{name: 'singleGist', params: {name: gist.name}}">
                <v-card ripple tile append replace style="width: 75vh;">
                  <v-card-title primary-title>
                    <div >
                      <p class="headline text-sm-left">{{gist.name}}</p>
                      <p class="headline text-sm-left">{{gist.id}}</p>
                      <p class="grey--text text-sm-left">Created {{ gist.createdAt | moment("from") }}</p>
                      <p class="grey--text text-sm-left">Stargazers: {{gist.stargazers.totalCount}}</p>
                      <p class="grey--text text-sm-left">Comments: {{gist.comments.totalCount}}</p>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat>Fork</v-btn>
                    <!--<v-btn flat color="purple">Explore</v-btn>-->
                    <v-spacer></v-spacer>
                    <v-btn flat>Star</v-btn>
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
    name: 'gists',
    data () {
      return {
        name: 'gists',
        viewer: []
      }
    },
    apollo: {
      viewer: {
        query: gql`query($number_of_gists:Int!) {
                    viewer {
                      login
                      gists(last:$number_of_gists) {
                        nodes{
                          id
                          name
                          createdAt
                          stargazers {
                            totalCount
                          }
                          comments{
                            totalCount
                          }
                          viewerHasStarred
                        }
                      }
                     }
                  }
                `,
        variables: {
          number_of_gists: 100
        }
      }
    }
  }
</script>

<style scoped>

</style>
