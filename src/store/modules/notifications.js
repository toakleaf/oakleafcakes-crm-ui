import axios from '@/axiosAPI';

const state = {
  status: null,
  successMessage: 'Request successful!',
  errorMessage: 'Request failed.',
  successMessageDuration: 3000,
  errorMessageDuration: 5000
};

const getters = {
  status: state => {
    return state.status;
  },
  successMessage: state => {
    return state.successMessage;
  },
  errorMessage: state => {
    return state.errorMessage;
  },
  successMessageDuration: state => {
    return state.successMessageDuration;
  },
  errorMessageDuration: state => {
    return state.errorMessageDuration;
  }
};

const mutations = {
  setStatus: (state, payload) => {
    if (!payload) return (state.status = null);
    const out = payload.toLowerCase();
    if (out === 'success' || out === 'error' || out === 'pending')
      return (state.status = out);
    state.status = null;
  },
  setSuccessMessage: (state, payload) => {
    if (!payload) return (state.successMessage = 'Request successful!');
    state.successMessage = payload;
  },
  setErrorMessage: (state, payload) => {
    if (!payload) return (state.errorMessage = 'Request failed.');
    state.errorMessage = payload;
  },
  setSuccessMessageDuration: (state, payload) => {
    if (!payload) return (state.successMessageDuration = 3000);
    state.successMessageDuration = payload;
  },
  setErrorMessageDuration: (state, payload) => {
    if (!payload) return (state.errorMessageDuration = 5000);
    state.errorMessageDuration = payload;
  }
};

const actions = {
  setStatus: ({ commit }, payload) => {
    if (!payload) return;
    commit('setStatus', payload);
  },
  sendSuccessMessage: ({ commit }, payload) => {
    if (!payload) return;
    commit('setSuccessMessage', payload);
    commit('setStatus', 'success');
    commit('setSuccessMessage');
  },
  sendErrorMessage: ({ commit }, payload) => {
    if (!payload) return;
    commit('setErrorMessage', payload);
    commit('setStatus', 'error');
    commit('setErrorMessage');
  },
  setSuccessMessageDuration: ({ commit }, payload) => {
    if (!payload) return;
    commit('setSuccessMessageDuration', payload);
  },
  setErrorMessageDuration: ({ commit }, payload) => {
    if (!payload) return;
    commit('setErrorMessageDuration', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
