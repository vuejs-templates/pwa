import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Router from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const Hello = resolve => {
  require.ensure(['@/components/Hello'], () => {
    resolve(require('@/components/Hello'))
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

Vue.use(Router){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  ]{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
