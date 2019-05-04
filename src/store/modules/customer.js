import axios from '../../axiosAPI';

const state = {
  currentCustomer: null,
  currentCustomerCreatedAt: null,
  currentCustomerUpdatedAt: null
};

const getters = {
  currentCustomer: state => {
    return state.currentCustomer;
  },
  currentCustomerCreatedAt: state => {
    return state.currentCustomerCreatedAt;
  },
  currentCustomerUpdatedAt: state => {
    return state.currentCustomerUpdatedAt;
  }
};

const mutations = {
  setCurrentCustomer: (state, payload) => {
    state.currentCustomer = payload;
    state.currentCustomerCreatedAt = payload
      ? new Date(payload['created_at'])
      : null;
    state.currentCustomerUpdatedAt = payload
      ? new Date(payload['updated_at'])
      : null;
    return;
  }
};

const actions = {
  fetchCurrentCustomer({ commit }, id) {
    axios
      .get('/account/id')
      .then(res => {
        commit('setCurrentCustomer', res.data[0]);
      })
      .catch(err => console.error('Error: ' + err));
  },
  setCurrentCustomer({ commit }, payload) {
    commit('setCurrentCustomer', payload);
  },
  clearCurrentCustomer({ commit }) {
    commit('setCurrentCustomer', null);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
