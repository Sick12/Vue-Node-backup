import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import login from '@/components/login'
import register from '@/components/register'
import user from '@/components/user'
import logout from '@/components/logout'
import test from '@/components/test'
import products from '@/components/products'
import product_add from '@/components/product_add'
import product_edit from '@/components/product_edit'
import user_profile from '@/components/user_profile'

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
    },
    {
      path: '/product/add',
      name:'productAdd',
      component: product_add
    },
    {
      path: '/product/edit',
      name: 'product_edit',
      component: product_edit
    },
    {
      path: '/user_profile',
      name: 'user_profile',
      component: user_profile
    }
  ]
})
