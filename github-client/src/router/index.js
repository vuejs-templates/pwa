import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import repos from '@/components/repos'
import issues from '@/components/issues'
import gists from '@/components/gists'
import singleRepo from '@/components/singleRepo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/repos',
      name: 'repos',
      component: repos
    },
    {
      path: '/issues',
      name: 'issues',
      component: issues
    },
    {
      path: '/gists',
      name: 'gists',
      component: gists
    },
    {
      path: '/singleRepo',
      name: 'singleRepo',
      component: singleRepo
    }
  ]
})
