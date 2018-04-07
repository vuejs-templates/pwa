<template>
  <div>
    <v-toolbar color="primary" light tabs>
      <v-tabs
        centered
        primary
        color="primary"
        slot="extension"
        slider-color="secondary"

      >
        <v-tab
          v-for="singleTab in tabItems"
          :key="singleTab"
          :href="`#tab-${singleTab}`"
        >
          {{ singleTab }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
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
            <li v-for="issue in viewer.issues.nodes.slice().reverse()">
              <router-link :to="{name: 'singleIssue', params: { owner: viewer.login, name: issue.id }}">
                <v-card ripple tile append replace style="width: 75vh;">
                  <v-card-title primary-title>
                    <div >
                      <p class="headline text-sm-left">{{issue.title}}</p>
                      <p class="grey--text text-sm-left">Created {{ issue.createdAt | moment("from") }}</p>
                      <p class="grey--text text-sm-left" v-if="issue.lastEditedAt">Last edited {{ issue.lastEditedAt | moment("from") }}</p>
                      <p class="grey--text text-sm-left">{{issue.repository.nameWithOwner}}#{{issue.number}}</p>
                      <p class="text-sm-left green--text" v-if="issue.state === 'OPEN' ">Open</p>
                      <p class="text-sm-left red--text" v-else>Closed {{ issue.closedAt | moment("from") }}</p>

                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat>Lock</v-btn>
                    <v-btn flat>Close</v-btn>
                    <v-btn flat>Subscribe</v-btn>
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
    </div>
</template>

<script>
  import gql from 'graphql-tag'
  import Vue from 'vue'
  Vue.use(require('vue-moment'))
  export default {
    name: 'issues',
    data () {
      return {
        name: 'issues',
        viewer: null,
        tabItems: ['Created', 'Watched', 'Assigned', 'Mentioned']
      }
    },
    apollo: {
      viewer: {
        query: gql`query($number_of_issues:Int!) {
                    viewer {
                      login
                      issues(last: $number_of_issues) {
                        nodes{
                          id
                          author {
                            login
                          }
                          closed
                          closedAt
                          createdAt
                          lastEditedAt
                          number
                          repository {
                            nameWithOwner
                          }
                          state
                          title
                        }
                      }
                     }
                  }
                `,
        variables: {
          number_of_issues: 100
        }
      }
    }
  }
</script>

<style scoped>

</style>
