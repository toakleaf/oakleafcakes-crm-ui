import axios from '../../axios-auth';
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
  updateAuthToken: (state, payload) => {
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
  register({ commit }, userData) {},
  login({ commit, dispatch }, payload) {
    axios
      .post(`/user/login`, payload)
      .then(res => {
        commit('updateAuthToken', res.headers['x-auth-token']);
        dispatch('setAuthHeaders');
        router.replace('/customers');
        localStorage.setItem('token', res.headers['x-auth-token']);
      })
      .catch(err => console.error(err));
  },
  persistSession({ commit }) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    commit('updateAuthToken', token);
    router.replace('/customers');
  },
  logout({ commit }) {
    commit('clearAuthData');
    axios.defaults.headers.common['Authorization'] = null;
    localStorage.removeItem('token');
    router.replace('/');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
