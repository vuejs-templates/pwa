<template>
  <v-container grid-list-md class="mt-5" >
    <v-layout row wrap>
      <v-avatar
        :tile="tile"
        :size="150"
        class="grey lighten-4 "
      >
        <img :src="user.avatarUrl" alt="avatar">
      </v-avatar>
      <v-layout column>
        <v-flex xs12 sm2>
          <span class="headline">{{user.login}}</span>
          <br>
          <span class="body-2" v-if="user.location">{{user.location}}</span>
          <span v-else class="grey--text">n/a</span>
          <v-btn round color="primary" dark :outline="!isFollowing" v-on:click="followLogic">Following</v-btn>
        </v-flex>
      </v-layout>
      <v-expansion-panel focusable class="mt-4">
        <v-expansion-panel-content >
          <div slot="header" class="body-2">Profile info</div>
          <v-card>
            <v-container fluid>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Name</v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text class="">{{user.name}}</v-card-text>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Location</v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text v-if="user.location">{{user.location}} </v-card-text>
                  <v-card-text v-else>n/a </v-card-text>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Website</v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text v-if="user.websiteUrl">{{user.websiteUrl}}</v-card-text>
                  <v-card-text v-else>n/a</v-card-text>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Email Address</v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text v-if="user.email">
                    {{user.email}}
                  </v-card-text>
                  <v-card-text v-else>n/a</v-card-text>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs4>
                  <v-subheader>Bio</v-subheader>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text v-if="user.bio">
                    {{user.bio}}
                  </v-card-text>
                  <v-card-text multiline v-else>n/a</v-card-text>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content >
          <div slot="header" class="body-2">Repositories</div>
          <v-card>
            <v-container>
              <li v-for="repo in user.repositories.nodes.slice().reverse()">
                <router-link v-if="repo.viewerPermission === 'WRITE'" :to="{name: 'knownRepo', params: { owner: repo.owner.login , name: repo.name }}">
                  <v-card ripple tile append replace style="width: 75vh;" >
                    <v-card-title primary-title>
                      <v-layout row>
                        <v-flex xs4 sm6>
                          <p class="headline text-sm-left">{{repo.name}}</p>
                          <p class="body-2 grey--text text-sm-left">Created <span class="body-1">{{ repo.createdAt | moment("from") }}</span></p>
                          <p class="body-2 grey--text text-sm-left">Forks: <span class="body-1">{{repo.forkCount}}</span></p>
                          <p class="body-2 grey--text text-sm-left">Stars: <span class="body-1">{{repo.stargazers.totalCount}}</span></p>
                        </v-flex>
                      </v-layout>
                      <!--<ul class="text-sm-left">-->
                      <!--<li v-for="lang in repo.languages.nodes">-->
                      <!--<div class="text-xs-center">-->
                      <!--<v-chip v-bind:color="lang.color">{{lang.name}}</v-chip>-->
                      <!--</div>-->
                      <!--</li>-->
                      <!--</ul>-->
                    </v-card-title>
                  </v-card>
                </router-link>
                <router-link  v-else :to="{name: 'visitedRepo', params: { owner: repo.owner.login , name: repo.name }}">
                  <v-card ripple tile append replace style="width: 75vh;" >
                    <v-card-title primary-title>
                      <v-layout row>
                        <v-flex xs4 sm6>
                          <p class="headline text-sm-left">{{repo.name}}</p>
                          <p class="body-2 grey--text text-sm-left">Created <span class="body-1">{{ repo.createdAt | moment("from") }}</span></p>
                          <p class="body-2 grey--text text-sm-left">Forks: <span class="body-1">{{repo.forkCount}}</span></p>
                          <p class="body-2 grey--text text-sm-left">Stars: <span class="body-1">{{repo.stargazers.totalCount}}</span></p>
                        </v-flex>
                      </v-layout>
                      <!--<ul class="text-sm-left">-->
                      <!--<li v-for="lang in repo.languages.nodes">-->
                      <!--<div class="text-xs-center">-->
                      <!--<v-chip v-bind:color="lang.color">{{lang.name}}</v-chip>-->
                      <!--</div>-->
                      <!--</li>-->
                      <!--</ul>-->
                    </v-card-title>
                  </v-card>
                </router-link>
              </li>
            </v-container>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content >
          <div slot="header" class="body-2">Gists</div>
          <v-card>
            <v-container>
              <li v-for="gist in user.gists.nodes.slice().reverse()">
                <router-link :to="{name: 'singleGist', params: {name: gist.name}}">
                  <v-card ripple tile append replace style="width: 75vh;">
                    <v-card-title primary-title>
                      <div >
                        <p class="headline text-sm-left">{{gist.name}}</p>
                        <p class="grey--text text-sm-left">Created {{ gist.createdAt | moment("from") }}</p>
                        <p class="grey--text text-sm-left">Stargazers: {{gist.stargazers.totalCount}}</p>
                      </div>
                    </v-card-title>
                    <v-card-actions>
                      <!--<v-btn flat>Fork</v-btn>-->
                      <!--&lt;!&ndash;<v-btn flat color="purple">Explore</v-btn>&ndash;&gt;-->
                      <!--<v-spacer></v-spacer>-->
                      <!--<v-btn flat>Star</v-btn>-->
                      <!--&lt;!&ndash;<v-btn flat color="purple">Explore</v-btn>&ndash;&gt;-->
                      <!--<v-spacer></v-spacer>-->
                    </v-card-actions>
                  </v-card>
                </router-link>
              </li>
            </v-container>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content >
          <div slot="header" class="body-2">Followers</div>
          <v-card>
            <v-container>
              <li v-for="user in user.followers.nodes">
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
            </v-container>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content >
          <div slot="header" class="body-2">Following</div>
          <v-card>
            <v-container>
              <li v-for="user in user.following.nodes">
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
            </v-container>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content >
          <div slot="header" class="body-2">Starred Repositories</div>
          <v-card>
            <v-container>
              <li v-for="starredRepo in user.starredRepositories.nodes.slice().reverse()">
                <router-link :to="{name: 'visitedRepo', params: { owner: starredRepo.owner.login , name: starredRepo.name }}">
                  <v-card ripple append replace style="width: 75vh;" >
                    <v-card-title primary-title>
                      <v-layout row>
                        <v-flex xs4 sm6>
                          <p class="headline text-sm-left">{{starredRepo.name}}</p>
                          <p class="body-2 grey--text text-sm-left">Created <span class="body-1">{{ starredRepo.createdAt | moment("from") }}</span></p>
                          <p class="body-2 grey--text text-sm-left">Forks: <span class="body-1">{{starredRepo.forkCount}}</span></p>
                          <p class="body-2 grey--text text-sm-left">Stars: <span class="body-1">{{starredRepo.stargazers.totalCount}}</span></p>
                        </v-flex>
                      </v-layout>
                      <!--<ul class="text-sm-left">-->
                      <!--<li v-for="lang in repo.languages.nodes">-->
                      <!--<div class="text-xs-center">-->
                      <!--<v-chip v-bind:color="lang.color">{{lang.name}}</v-chip>-->
                      <!--</div>-->
                      <!--</li>-->
                      <!--</ul>-->
                    </v-card-title>
                  </v-card>
                </router-link>
              </li>
            </v-container>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-layout>
  </v-container>

</template>

<script>
  import gql from 'graphql-tag'
  import axios from 'axios'

  export default {
    name: 'user',
    data () {
      return {
        user: null,
        gh: null,
        following: null
      }
    },
    apollo: {
      user: {
        query: gql`
          query getUser($login:String!){
          user(login:$login){
            avatarUrl
            login
            bio
            name
            email
            location
            isViewer
            viewerIsFollowing
            websiteUrl
            repositories(last:100){
              nodes{
                name
                createdAt
                forkCount
                viewerPermission
                stargazers{
                  totalCount
                }
                owner{
                  login
                 }
              }
            }
            followers(last:100){
              totalCount
              nodes{
                login
                avatarUrl
              }
            }
            following(last: 100){
              totalCount
              nodes{
                login
                avatarUrl
              }
            }
            gists(last: 100){
              nodes{
                name
                description
                createdAt
                updatedAt
                id
                viewerHasStarred
                stargazers{totalCount}
              }
            }
            pinnedRepositories(last:100){
              edges{
                node{
                  name
                  owner{login avatarUrl}
                  createdAt
                }
              }
            }
            starredRepositories(last:100){
              nodes{

                  name
                  owner{
                    login
                    avatarUrl
                  }
                  createdAt
                  forkCount
                  stargazers{
                    totalCount
                  }

              }
            }
          }
        }
        `,
        variables () {
          return {
            login: this.$route.params.login
          }
        }
      }
    },
    mounted () {
    },
    methods: {
      followLogic: function () {
        var _self = this
        console.log('TOKEN', _self.$store.getters.getToken)
        if (!_self.following) {
          axios.put('https://api.github.com/user/following/' + _self.user.login, null, {
            headers: {
              'Authorization': 'token ' + _self.$store.getters.getToken
            }
          }
          ).then(function (data) {
            console.log('start following')
            _self.following = true
          })
        } else {
          axios.delete('https://api.github.com/user/following/' + _self.user.login, null, {
            headers: {
              'Authorization': 'token ' + _self.$store.getters.getToken
            }
          }
          ).then(function (data) {
            console.log('stop following')
            _self.following = false
          })
        }
      }
    },
    computed: {
      isFollowing: function () {
        var _self = this
        if (_self.user) {
          console.log('FOLLOWING ' + _self.user.viewerIsFollowing)
          if (_self.user.viewerIsFollowing) {
            _self.following = true
          }
          if (_self.following) return true
          else return false
        }
      }
    }
  }
</script>

<style lang="sass" scoped>
</style>
