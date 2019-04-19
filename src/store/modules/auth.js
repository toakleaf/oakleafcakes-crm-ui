import axios from '../../axiosAPI';
import router from '../../router';
const jwt = require('jsonwebtoken');

const state = {
  authToken: null,
  tokenExp: null
};

const getters = {
  isAuthenticated: state => {
    return state.authToken !== null;
  },
  tokenExp: state => {
    return state.tokenExp;
  }
};

const mutations = {
  setAuthToken: (state, payload) => {
    state.authToken = payload;
    state.tokenExp = jwt.decode(payload).exp;
    return;
  },
  clearAuthData: state => {
    state.authToken = null;
    state.tokenExp = null;
    return;
  }
};

const actions = {
  setAuthHeaders: ({ commit, state }, payload) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      state.authToken
    }`;
  },
  setLogoutTimer: ({ dispatch }, exp) => {
    setTimeout(() => {
      dispatch('logout');
    }, parseInt(exp - Date.now() / 1000) * 1000);
  },
  login({ commit, dispatch, state }, payload) {
    axios
      .post(`/account/login`, payload)
      .then(res => {
        commit('setAuthToken', res.headers['x-auth-token']);
        dispatch('setAuthHeaders');
        localStorage.setItem('token', res.headers['x-auth-token']);
      })
      .then(() => dispatch('fetchAuthorData'))
      .then(() => router.replace('/'))
      .then(() => dispatch('setLogoutTimer', jwt.decode(state.authToken).exp))
      .catch(err => console.error(err));
  },
  logout({ commit }) {
    commit('clearAuthData');
    commit('clearAuthorData');
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
    router.replace('/login');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
