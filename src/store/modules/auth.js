import axios from '../../axiosAPI';
import router from '../../router';

const state = {
  authToken: null
};

const getters = {
  isAuthenticated: state => {
    return state.authToken !== null;
  }
};

const mutations = {
  setAuthToken: (state, payload) => {
    state.authToken = payload;
  },
  clearAuthData: state => {
    return (state.authToken = null);
  }
};

const actions = {
  setAuthHeaders: ({ commit, state }, payload) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      state.authToken
    }`;
  },
  login({ commit, dispatch }, payload) {
    axios
      .post(`/account/login`, payload)
      .then(res => {
        commit('setAuthToken', res.headers['x-auth-token']);
        dispatch('setAuthHeaders');
        localStorage.setItem('token', res.headers['x-auth-token']);
      })
      .then(() => dispatch('fetchAccountData'))
      .then(() => router.replace('/'))
      .catch(err => console.error(err));
  },
  // persistSession({ commit, dispatch }) {
  //   console.log('yoyoyo');
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     return;
  //   }
  //   commit('setAuthToken', token);
  //   dispatch('setAuthHeaders');
  //   // router.replace('/');
  //   router.back();
  // },
  logout({ commit }) {
    commit('clearAuthData');
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
