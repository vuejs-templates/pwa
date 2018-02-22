<template>
    <div>
      Dashboard of {{ viewer.name }}

    </div>
</template>

<script>
  import GitHub from 'github-api'
  import gql from 'graphql-tag'
  export default {
    name: 'dashboard',
    data () {
      return {
        me: null,
        gh: null,
        viewer: ''
      }
    },
    mounted () {
      // to use with v3
      this.gh = new GitHub({
        token: this.$store.getters.getToken
      })
    },
    apollo: {
      viewer: {
        query: gql`query repos($number_of_repos:Int!) {
                    viewer {
                      name
                       repositories(last: $number_of_repos) {
                         nodes {
                           name
                         }
                       }
                    }
                  }
                `,
        variables: {
          number_of_repos: 3
        }
      }
    }
  }
</script>

<style scoped>

</style>
