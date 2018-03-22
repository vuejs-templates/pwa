<template>
    <div>
        {{ name }}
    </div>

</template>

<script>
  import gql from 'graphql-tag'
  import Vue from 'vue'
  Vue.use(require('vue-moment'))
  export default {
    name: 'single-issue',
    data: () => ({
      name: 'singleIssue',
      viewer: []
    }),
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
    }
  }
</script>

<style scoped>

</style>
