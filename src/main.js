import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.filter('formatNumber', function (num) {
  return typeof num === 'number' ? num.toLocaleString() : num;
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
