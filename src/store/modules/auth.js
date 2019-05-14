import axios from '@/axiosAPI';
import router from '@/router';
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
  },
  authToken: state => {
    return state.authToken;
  }
};

const mutations = {
  setAuthToken: (state, payload) => {
    if (!payload) {
      state.authToken = null;
      state.tokenExp = null;
      return;
    }
    state.authToken = payload;
    state.tokenExp = jwt.decode(payload).exp;
    return;
  }
};

const actions = {
  setAuthHeaders: ({ commit, getters }, payload) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      getters.authToken
    }`;
  },
  setLogoutTimer: ({ dispatch }, exp) => {
    setTimeout(() => {
      dispatch('logout');
    }, parseInt(exp - Date.now() / 1000) * 1000);
  },
  login({ commit, dispatch, getters }, payload) {
    axios
      .post(`/account/login`, payload)
      .then(res => {
        const role = jwt.decode(res.headers['x-auth-token']).role;
        if (!(role === 'ADMIN' || role === 'EMPLOYEE'))
          throw new Error('This account is unauthorized.');
        commit('setAuthToken', res.headers['x-auth-token']);
        dispatch('setAuthHeaders');
        localStorage.setItem('token', res.headers['x-auth-token']);
        dispatch('fetchAuthorData');
      })
      .then(() => router.replace('/'))
      .then(() => {
        dispatch('setLogoutTimer', jwt.decode(getters.authToken).exp);
      })
      .catch(err => {
        console.error(err);
        dispatch(
          'sendErrorMessage',
          'Login attempt failed. Please check your credentials or connection and try again.'
        );
      });
  },
  clearAuthData({ commit }) {
    commit('setAuthToken');
  },
  logout({ commit, dispatch }, redirect = true) {
    dispatch('clearCurrentCustomer');
    dispatch('clearAuthorData');
    dispatch('clearAuthData');
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
    if (redirect) router.replace('/login');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
