<template>
    <div>
      hello
        <span>hasdfhka {{viewer.gist.name}}</span>
      <span>{{viewer.gist.createdAt}}</span>
      <span>{{viewer.gist.description}}</span>
      <span>{{viewer.gist.stargazers.totalCount}}</span>
      <span>{{viewer.gist.createdAt}}</span>
    </div>

</template>

<script>
  import store from '../store'
  import gql from 'graphql-tag'
  import GitHub from 'github-api'

  export default {
    name: 'single-gist',
    data: () => ({
      name: 'singleGist',
      gistName: null,
      viewer: null,
      gist: null
    }),
    apollo: {
      viewer: {
        query: gql`
        query getGist($gist_name: String!){
            viewer{
              gist(name: $gist_name){
                name
                createdAt
                description
                stargazers{
                  totalCount
                }
              }
            }
          }
        `,
        variables () {
          return {
            gist_name: this.gistName
          }
        }
      }
    },
    mounted: function () {
      var gh = new GitHub({ token: store.getters.getToken })
      this.gistName = this.$route.params.name
      this.gist = gh.getGist(this.gistName)
      this.gist.read().then(function (data) {
        var files = data.data.files
        console.log(files)
      })
      console.log('name', this.$route.params.name)
    }
  }
</script>

<style scoped>

</style>
