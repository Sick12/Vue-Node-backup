import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import user from '@/components/user'
import logout from '@/components/logout'
import test from '@/components/test'
import products from '@/components/products'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/products',
      name: 'products',
      component: products
    }
  ]
})
