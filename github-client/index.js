console.log("index file")
var config = require('./config')

console.log("config: " + config)

function renderLink () {
  var url = 'https://github.com/login/oauth/authorize?client_id=' + config.client_id + '&scope=user&redirect_uri=' + config.redirect_uri
  var link = document.createElement('a')
  link.href = url
  link.innerHTML = 'Log in with GitHub'
  document.body.appendChild(link)
}
