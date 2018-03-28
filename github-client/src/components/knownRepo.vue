<template>
  <div>

    <v-card height="10vh">
      <v-layout align-center justify-center>
        <button class="icon" v-bind:class="{isTrue: isStarred}" v-on:click="starLogic">
          <i class="fas fa-star"></i>
        </button>
        <span>{{repository.stargazers.totalCount}}</span>
        <button class="icon" v-bind:class="{isTrue: isWatched}" v-on:click="watchLogic">
          <i class="fas fa-eye"></i>
        </button>
        <span>{{repository.watchers.totalCount}}</span>
        <button v-if="repository.hasWikiEnabled" class="icon" v-on:click="">
          <i class="fas fa-book"></i>
        </button>
        <button class="icon" v-on:click="">
          <i class="fas fa-code-branch"></i>
        </button>
        <span>{{repository.forkCount}}</span>
      </v-layout>
    </v-card>
    <v-tabs
      fixed-tabs
      v-model="currentItem"
      color="transparent"
      slider-color="secondary"
      slot="extension"
    >
      <v-tab
        v-for="item in items"
        :key="item"
        :href="'#' + item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentItem">
      <v-tab-item
        v-for="item in items"
        :key="item"
        :id="item"
      >
        <v-card flat>
          <v-card-text>
            <h2>{{ item }}</h2>
            <v-layout justify-start>
              <div v-if="item === 'Readme'">
                <vue-markdown v-bind:source="readme"></vue-markdown>
              </div>
              <div v-if="item === 'Files'">
                <ul>
                  <li v-for="file in contents">
                    <v-icon v-if="file.type=='file'">insert_drive_file</v-icon>
                    <v-icon v-if="file.type=='dir'">folder</v-icon>
                    {{file.name}}
                    <!--<p><span v-html="file.content"></span></p>-->
                  </li>
                </ul>
              </div>
              <div v-if="item === 'Commits'">
                <ul>
                  <li v-for="commit in commits">
                    {{commit.commit.message}}
                  </li>
                </ul>
              </div>
              <div v-if="item === 'Collaborators'">
                <ul >
                  <li v-for="user in repository.collaborators.nodes">

                    <router-link :to="{name: 'User', params: {login: user.login}}">
                      <v-layout align-center class="mb-2" row>
                        <v-avatar>
                          <img :src="user.avatarUrl" alt="John">
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <span class="body-2">{{user.login}}</span>
                      </v-layout>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div v-if="item === 'Issues'">
                <ul >
                  <li v-for="issue in repository.issues.nodes">
                    <v-layout row>
                      <v-layout align-center class="mb-2" column>
                        <v-avatar>
                          <img :src="issue.author.avatarUrl" alt="John">
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <span class="body-2">{{issue.author.login}}</span>
                      </v-layout>
                      <div>{{issue.title}}</div>
                    </v-layout>
                  </li>
                </ul>
              </div>
              <div v-if="item === 'Contributors'">
                <ul >
                  <li v-for="user in contributors">

                    <router-link :to="{name: 'User', params: {login: user.login}}">
                      <v-layout align-center class="mb-2" row>
                        <v-avatar>
                          <img :src="user.avatar_url" alt="John">
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <span class="body-2">{{user.login}}</span>
                      </v-layout>
                    </router-link>
                  </li>
                </ul>
              </div>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  // import GitHub from 'github-api'
  // import store from '../store'
  import VueMarkdown from 'vue-markdown'
  import gql from 'graphql-tag'

  export default {
    name: 'singleRepo',
    components: {
      VueMarkdown
    },
    data () {
      return {
        repositoryOwner: this.$route.params.owner,
        repositoryName: this.$route.params.name,
        contents: [],
        contributors: [],
        currentItem: 'Readme',
        items: [
          'Readme', 'Files', 'Commits', 'Collaborators', 'Issues', 'Contributors'
        ],
        readme: '',
        commits: [],
        avatarSize: '56',
        repo: null,
        repository: null,
        viewer: null,
        starred: null,
        starCount: 0,
        watched: false,
        watchCount: 0,
        forkCount: 0,
        stateToSubscribe: '',
        collaborators: null
      }
    },
    apollo: {
      repository: {
        query: gql`query($repo_name: String!, $repo_owner: String!, $number: Int!) {
                      repository(owner: $repo_owner, name: $repo_name){
                        id
                        viewerSubscription
                        viewerCanSubscribe
                        viewerHasStarred
                        viewerPermission
                        forkCount
                        hasWikiEnabled
                        stargazers{
                          totalCount
                        }
                        watchers{
                          totalCount
                        }
                        collaborators(last: $number) {
                          nodes {
                            login
                            avatarUrl
                          }
                        }
                        issues(last: 100) {
                          nodes{
                            author{
                              avatarUrl
                              login
                            }
                            title
                            closedAt
                            number
                            state
                            id
                            publishedAt
                          }
                        }
                      }
                     }
        `,
        variables () {
          return {
            repo_name: this.repositoryName,
            repo_owner: this.repositoryOwner,
            number: 100
          }
        },
        fetchPolicy: 'cache-then-network'
      }
    },
    mounted () {
      var _self = this

      var user = _self.gh.getUser()
      console.log(user)
      _self.repo = _self.gh.getRepo(this.repositoryOwner, this.repositoryName)
      _self.repo.getContents().then(function (result) {
        // console.log(result.data)
        result.data.forEach(function (each) {
          if (each.type === 'file') {
            _self.repo.getBlob(each.sha).then(function (inside) {
              // console.log(inside.data)
              each['content'] = inside.data
              _self.contents.push(each)
              if (each.name === 'README.md') {
                _self.readme = inside.data
              }
            })
          } else {
            _self.contents.push(each)
          }
        })
      })
      _self.repo.listCommits().then(function (result) {
        // console.log(result.data)
        result.data.forEach(function (each) {
          _self.commits.push(each)
        })
      })
      _self.repo.getContributors().then(function (result) {
        // console.log(result.data)
        result.data.forEach(function (each) {
          _self.contributors.push(each)
        })
      })
    },
    methods: {
      starLogic: function (event) {
        var _self = this
        if (this.starred) {
          _self.repo.unstar().then(function (response) {
            _self.starred = false
            console.log('unstarred' + response)
          })
        } else {
          _self.repo.star().then(function (response) {
            _self.starred = true
            console.log('starred' + response)
          })
        }
      },
      forkLogic: function () {
        var _self = this
        if (_self.viewerHasForked) {
          _self.showForkTooltip = true
        } else {
          _self.repo.fork().then(function (response) {
            _self.viewerHasForked = true
            console.log(response)
          })
        }
      },
      watchLogic: function () {
        var _self = this
        if (!_self.watched) {
          console.log('unwatch logic')
          _self.stateToSubscribe = 'SUBSCRIBED'
          _self.$apollo.mutate({
            mutation: gql`mutation subscribeRepository($user: String!, $state: SubscriptionState!, $subId: ID!) {
                        updateSubscription(input:{clientMutationId: $user, state: $state, subscribableId: $subId }) {
                          clientMutationId:clientMutationId
                          subscribable:subscribable {
                            id
                          }
                        }
                      }`,
            variables: {
              user: _self.viewer.id,
              state: _self.stateToSubscribe,
              subId: _self.repository.id
            }
          })
          _self.watched = true
        } else {
          console.log('watch logic')
          _self.stateToSubscribe = 'UNSUBSCRIBED'
          _self.$apollo.mutate({
            mutation: gql`mutation subscribeRepository($user: String!, $state: SubscriptionState!, $subId: ID!) {
                        updateSubscription(input:{clientMutationId: $user, state: $state, subscribableId: $subId }) {
                          clientMutationId:clientMutationId
                          subscribable:subscribable {
                            id
                          }
                        }
                      }`,
            variables: {
              user: _self.viewer.id,
              state: _self.stateToSubscribe,
              subId: _self.repository.id
            }
          })
          _self.watched = false
          console.log(_self.watched)
        }
      }
    },
    computed: {
      isStarred: function () {
        var _self = this
        if (_self.repository) {
          console.log(_self.repository.viewerHasStarred)
          if (_self.repository.viewerHasStarred) {
            _self.starred = true
          }
          if (_self.starred) return true
          else return false
        }
      },
      isWatched: function () {
        var _self = this
        if (_self.repository) {
          if (_self.repository.viewerSubscription === 'SUBSCRIBED') {
            _self.watched = true
          }
          if (_self.watched) return true
          else return false
        }
      },
      viewerIsOwner: function () {
        // var _self = this
        return true
        // if (_self.viewer.login === _self.repository.repositoryOwner) return true
        // else return false
      }
    }
  }
</script>

<style lang="sass" scoped>
  .icon
    margin: 1vh 1vw 1vh
    font-size: 2em

  .icon:focus
    outline: none

  .isTrue
    margin-right: 1vw
    font-size: 2em
    color: green
</style>
