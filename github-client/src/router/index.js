import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Dashboard from '@/components/Dashboard'
import repos from '@/components/repos'
import issues from '@/components/issues'
import gists from '@/components/gists'
import knownRepo from '@/components/knownRepo'
import singleGist from '@/components/singleGist'
import singleIssue from '@/components/singleIssue'
import User from '@/components/User'
import Search from '@/components/Search'
import singleFile from '@/components/singleFile'
import visitedRepo from '@/components/visitedRepo'
import CreateRepo from '@/components/CreateRepo'
import PullRequest from '@/components/PullRequest'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: { auth: false }
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
      path: '/repo/:owner/:name',
      name: 'knownRepo',
      component: knownRepo,
      meta: { auth: true }
    },
    {
      path: '/gist/:name',
      name: 'singleGist',
      component: singleGist,
      meta: { auth: true }
    },
    {
      path: '/issue/:id',
      name: 'singleIssue',
      component: singleIssue,
      meta: { auth: true }
    },
    {
      path: '/user/:login',
      name: 'User',
      component: User,
      meta: { auth: true }
    },
    {
      path: '/search/:filter/:input',
      name: 'Search',
      component: Search,
      meta: { auth: true }
    },
    {
      path: '/file/:sha',
      name: 'singleFile',
      component: singleFile,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:name',
      name: 'visitedRepo',
      component: visitedRepo,
      meta: { auth: true }
    },
    {
      path: '/create/',
      name: 'CreateRepo',
      component: CreateRepo,
      meta: { auth: true }
    },
    {
      path: '/repo/:owner/:name/pull/:number',
      name: 'PullRequest',
      component: PullRequest,
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
