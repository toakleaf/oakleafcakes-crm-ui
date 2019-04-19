import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Buefy from 'buefy';
import Vuelidate from 'vuelidate';
import './registerServiceWorker';

Vue.use(Buefy);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

require('./assets/styles/main.scss');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
