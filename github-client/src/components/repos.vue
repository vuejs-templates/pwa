<template>
  <div>
    <ul>
      <li v-for="repo in viewer.repositories.nodes">
        <div>{{ repo }}</div>
        <v-layout>
          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <v-card-media src="/static/code.jpg" height="200px">
              </v-card-media>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{ repo.name }}</h3>
                  <span><v-icon>star rate</v-icon>{{ repo.stargazers.totalCount}}</span>
                  <span><v-icon>access time</v-icon>{{ repo.createdAt }}</span>
                  <span>{{repo.forks.totalCount}}</span>
                  <span>{{repo.diskUsage}}</span>
                  <div>
                    <ul>
                      <li v-for="lang in repo.languages.nodes">
                        <v-card>
                          <v-card-title>
                            <div :color="lang.color">

                            </div>
                          </v-card-title>
                        </v-card>
                      </li>
                    </ul>
                  </div>
                </div>
              </v-card-title>
              v-card
              <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
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
  export default {
    name: 'repos',
    data () {
      return {
        viewer: []
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
