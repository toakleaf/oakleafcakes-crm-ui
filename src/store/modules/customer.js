import axios from '@/axiosAPI';

const state = {
  currentCustomer: null,
  currentCustomerCreatedAt: null,
  currentCustomerUpdatedAt: null
};

const getters = {
  currentCustomer: state => {
    return state.currentCustomer;
  },
  currentCustomerID: state => {
    return state.currentCustomer ? state.currentCustomer.id : null;
  }
};

const mutations = {
  setCurrentCustomer: (state, payload) => {
    state.currentCustomer = payload;

    if (!state.currentCustomer) return;
    if (
      state.currentCustomer.emails &&
      state.currentCustomer.emails.length > 0
    ) {
      state.currentCustomer.emails = state.currentCustomer.emails.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.currentCustomer.emails.map(e => {
        if (!(e.created_at && e.updated_at)) return e;
        return {
          ...e,
          created_at: new Date(e.created_at),
          updated_at: new Date(e.updated_at)
        };
      });
    }
    if (
      state.currentCustomer.phones &&
      state.currentCustomer.phones.length > 0
    ) {
      state.currentCustomer.phones = state.currentCustomer.phones.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.currentCustomer.phones.map(p => {
        if (!(p.created_at && p.updated_at)) return p;
        return {
          ...p,
          created_at: new Date(p.created_at),
          updated_at: new Date(p.updated_at)
        };
      });
    }
    if (
      state.currentCustomer.logins &&
      state.currentCustomer.logins.length > 0
    ) {
      state.currentCustomer.logins = state.currentCustomer.logins.sort((a, b) =>
        a.is_active ? -1 : 1
      );
      state.currentCustomer.logins.map(l => {
        if (!(l.created_at && l.updated_at)) return l;
        return {
          ...l,
          created_at: new Date(l.created_at),
          updated_at: new Date(l.updated_at)
        };
      });
    }
    if (state.currentCustomer.created_at)
      state.currentCustomer.created_at = new Date(
        state.currentCustomer.created_at
      );
    if (state.currentCustomer.updated_at)
      state.currentCustomer.updated_at = new Date(
        state.currentCustomer.updated_at
      );

    return;
  }
};

const actions = {
  fetchCurrentCustomer({ commit }, id) {
    axios
      .get(`/account/${id}`)
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
