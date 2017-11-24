// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/components/app/index.vue'
import router from './router'
import axios from 'axios'

//turn off Vue production tip

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
   baseURL: 'http://localhost:3000'
  // timeout: 1000,
  // headers: {'Authorization': localStorage.getItem('Authorization')}

});
//let instance = axios.create({});


/* eslint-disable no-new */
//save in localStorage & if token exists put in header 
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
