import Vue from 'vue';
import App from './App.vue';
import store from './store';
import ResponsiveHelpers from './plugins/ResponsiveHelpers.js';


Vue.config.productionTip = false;
Vue.use(ResponsiveHelpers);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
