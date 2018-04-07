'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  client_id: '"9dc14d5ccfe55d2df9d9"',
  redirect_uri: '"http://localhost:8080"',
  gatekeeper: '"https://gatekeeper-pwa.herokuapp.com:17475"'
})
