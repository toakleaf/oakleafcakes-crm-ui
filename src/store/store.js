import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import author from './modules/author';
import customer from './modules/customer';
import preferences from './modules/preferences';
import notifications from './modules/notifications';

import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters,
  actions,
  mutations,
  modules: {
    auth,
    author,
    customer,
    preferences,
    notifications
  }
});
