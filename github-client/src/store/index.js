import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const initialState = {
  authenticated: false,
  token: ''
}

const state = Vue.util.extend({}, initialState)

const mutations = {
  RESET_STATE (state, payload) {
    for (let f in state) {
      Vue.set(state, f, initialState[f])
    }
  },
  changeAuthState (state) {
    state.authenticated = !state.authenticated
  },
  setToken (state, token) {
    localStorage.setItem('token', token)
    state.token = token
  }
}

const actions = {
  resetState: ({ commit }) => commit('RESET_STATE'),
  setAuthState: ({ commit }) => commit('changeAuthState'),
  setToken (context, token) {
    context.commit('setToken', token)
  }
}

const getters = {
  getAuthState: state => { return state.authenticated },
  getToken: state => { return state.token }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()]
})
