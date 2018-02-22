<template>
  <div class="hello" id="div-not-authenticated">
      you're not authenticated, please authenticate below
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import router from '../router'
  import GitHub from 'github-api'
  var qs = require('querystring')
  // var config = require('../../config')
  var xhr = require('xhr')
  export default {
    name: 'hello',
    data () {
      return {
        msg: '',
        inputUsername: '',
        inputPassword: '',
        code: '',
        client_id: process.env.client_id,
        redirect_uri: process.env.redirect_uri,
        gh: null
      }
    },
    computed: {
      ...mapGetters([
        'getAuthState'
      ])
    },
    methods: {
      ...mapActions([
        'setAuthState',
        'setToken'
      ]),
      getCode: function () {
        var query = window.location.href.split('?')[1]
        if (query) return qs.parse(query.slice(0, query.length - 2)).code
      },
      getToken: function (code, callback) {
        var options = {
          url: 'http://localhost:9999/authenticate/' + code,
          json: true
        }
        xhr(options, function (err, res, body) {
          if (err) {
            return callback(err)
          }
          callback(null, body.token)
        })
      },
      getProfile: function (token, callback) {
        var options = {
          url: 'https://api.github.com/user',
          json: true,
          headers: {
            authorization: 'token ' + token
          }
        }

        xhr(options, function (err, res, body) {
          if (err) return callback(err)
          callback(null, body)
        })
      },
      renderProfile: function (profile) {
        var p = document.createElement('p')
        p.innerHTML = profile.name
        document.body.appendChild(p)
      },
      authenticate: function () {
        var url = 'https://github.com/login/oauth/authorize?client_id=' + process.env.client_id + '&scope=user%20notifications%20gist%20repo%20public_repo%20delete_repo%20user:follow%20read:user&redirect_uri=' + process.env.redirect_uri
        var link = document.createElement('a')
        link.href = url
        link.innerHTML = 'Log in with GitHub'
        link.addEventListener('click', this.getCodeAndToken())
        document.getElementById('div-not-authenticated').appendChild(link)
      },
      getCodeAndToken: function () {
        var code = this.getCode()
        var component = this
        if (code) {
          component.getToken(code, function (err, token) {
            if (err) return err
            if (token) {
              component.setToken(token)
              // component.getProfile(token, function (err, profile) {
              //   if (err) return err
              //   component.renderProfile(profile)
              // })
              component.setAuthState()
              router.push({ name: 'repos' })
              component.gh = new GitHub({
                token: component.$store.getters.getToken
              })
            } else {
              console.log('Invalid code')
            }
          })
        }
      }
    },
    mounted () {
      this.authenticate()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
