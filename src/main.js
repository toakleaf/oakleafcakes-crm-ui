import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import Buefy from 'buefy';
import './registerServiceWorker';
// import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.common['Authorization'] = '';

Vue.use(Buefy);

Vue.config.productionTip = false;

require('./assets/styles/main.scss');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
