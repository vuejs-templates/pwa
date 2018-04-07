import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import * as Cookies from 'js-cookie'

Vue.use(Vuex)

const initialState = {
  authenticated: false,
  token: '',
  activeNav: 'repositories',
  viewer: null
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
  },
  setViewer (state, viewer) {
    localStorage.setItem('viewer', viewer)
    state.viewer = viewer
  }
}

const actions = {
  resetState: ({ commit }) => commit('RESET_STATE'),
  setAuthState: ({ commit }) => commit('changeAuthState'),
  setToken (context, token) {
    context.commit('setToken', token)
  },
  setViewer (context, viewer) {
    context.commit('setViewer', viewer)
  }
}

const getters = {
  getAuthState: state => { return state.authenticated },
  getToken: state => { return state.token },
  getActiveNav: state => { return state.activeNav },
  getViewer: state => { return state.getViewer }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()]
})
