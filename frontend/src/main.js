// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/components/app/index.vue'
import router from './router'
import axios from 'axios'
import jQuery from 'jQuery'
global.jQuery = jQuery;
let Bootstrap = require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'
import eventBus from './components/eventBus'
import toastr from 'toastr'

Vue.prototype.$bus = eventBus
Vue.prototype.$toastr = toastr

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "1600",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
//turn off Vue production tip
Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000'
  // timeout: 1000,
  // headers: {'Authorization': localStorage.getItem('Authorization')}

});

/* eslint-disable no-new */
//save in localStorage & if token exists put in header 
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
