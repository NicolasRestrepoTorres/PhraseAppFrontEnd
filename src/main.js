// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import i18n from '@/plugins/i18n'
import FlagIcon from 'vue-flag-icon'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)

Vue.use(FlagIcon);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
})


