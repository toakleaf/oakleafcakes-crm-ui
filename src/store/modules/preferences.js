import axios from '@/axiosAPI';

const state = {
  showLoadingOverlay: true,
  showToast: true
};

const getters = {
  showLoadingOverlay: state => {
    return state.showLoadingOverlay;
  },
  showToast: state => {
    return state.showToast;
  }
};

const mutations = {
  setShowLoadingOverlay: (state, payload) => {
    if (payload !== true) return (state.showLoadingOverlay = false);
    state.showLoadingOverlay = true;
  },
  setShowToast: (state, payload) => {
    if (payload !== true) return (state.showToast = false);
    state.showToast = true;
  }
};

const actions = {
  setShowLoadingOverlay({ commit }, payload) {
    commit('setShowLoadingOverlay', payload);
  },
  setShowToast({ commit }, payload) {
    commit('setShowToast', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
