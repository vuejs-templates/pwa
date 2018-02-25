import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import repos from '@/components/repos'
import issues from '@/components/issues'
import gists from '@/components/gists'
import singleRepo from '@/components/singleRepo'
import NotFound from '@/components/NotFound'

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
      component: Dashboard,
      meta: { auth: true }
    },
    {
      path: '/repos',
      name: 'repos',
      component: repos,
      meta: { auth: true }
    },
    {
      path: '/issues',
      name: 'issues',
      component: issues,
      meta: { auth: true }
    },
    {
      path: '/gists',
      name: 'gists',
      component: gists,
      meta: { auth: true }
    },
    {
      path: '/singleRepo/:owner/:name',
      name: 'singleRepo',
      component: singleRepo,
      meta: { auth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: { auth: true }
    }
  ],
  saveScrollPosition: true,
  history: true
})
