import axios from '@/axiosAPI';

const state = {
  currentCustomer: null,
  currentCustomerID: null,
  currentCustomerRole: null,
  currentCustomerFirstName: null,
  currentCustomerLastName: null,
  currentCustomerCompanyName: null,
  currentCustomerWorkingEmail: null,
  currentCustomerWorkingPhone: null
};

const getters = {
  currentCustomer: state => {
    return state.currentCustomer;
  },
  currentCustomerID: state => {
    return state.currentCustomerID;
  },
  currentCustomerRole: state => {
    return state.currentCustomerRole;
  },
  currentCustomerFirstName: state => {
    return state.currentCustomerFirstName;
  },
  currentCustomerLastName: state => {
    return state.currentCustomerLastName;
  },
  currentCustomerCompanyName: state => {
    return state.currentCustomerCompanyName;
  },
  currentCustomerWorkingEmail: state => {
    return state.currentCustomerWorkingEmail;
  },
  currentCustomerWorkingPhone: state => {
    return state.currentCustomerWorkingPhone;
  }
};

const mutations = {
  setCurrentCustomer: (state, payload) => {
    if (!payload) {
      state.currentCustomer = null;
      state.currentCustomerID = null;
      state.currentCustomerRole = null;
      state.currentCustomerFirstName = null;
      state.currentCustomerLastName = null;
      state.currentCustomerCompanyName = null;
      state.currentCustomerWorkingEmail = null;
      state.currentCustomerWorkingPhone = null;
      return;
    }
    state.currentCustomer = payload;
    state.currentCustomerID = payload.id;
    state.currentCustomerRole = payload.role;
    state.currentCustomerFirstName = payload.first_name;
    state.currentCustomerLastName = payload.last_name;
    state.currentCustomerCompanyName = payload.company_name;

    if (payload.emails && payload.emails.length > 0) {
      state.currentCustomer.emails = payload.emails.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.currentCustomer.emails = state.currentCustomer.emails.map(e => {
        if (!(e.created_at && e.updated_at)) return e;
        return {
          ...e,
          created_at: new Date(e.created_at),
          updated_at: new Date(e.updated_at)
        };
      });
      state.currentCustomerWorkingEmail = state.currentCustomer.emails[0].email;
    }
    if (
      state.currentCustomer.phones &&
      state.currentCustomer.phones.length > 0
    ) {
      state.currentCustomer.phones = state.currentCustomer.phones.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.currentCustomer.phones = state.currentCustomer.phones.map(p => {
        if (!(p.created_at && p.updated_at)) return p;
        return {
          ...p,
          created_at: new Date(p.created_at),
          updated_at: new Date(p.updated_at)
        };
      });
      state.currentCustomerWorkingPhone = state.currentCustomer.phones[0].phone;
    }

    if (payload.email) state.currentCustomerWorkingEmail = payload.email;
    if (payload.phone) state.currentCustomerWorkingPhone = payload.phone;

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
    if (payload.created_at)
      state.currentCustomer.created_at = new Date(payload.created_at);
    if (payload.updated_at)
      state.currentCustomer.updated_at = new Date(payload.updated_at);

    return;
  }
};

const actions = {
  fetchCurrentCustomer({ commit }, id) {
    axios
      .get(`/account/${id}`)
      .then(res => {
        commit('setCurrentCustomer', res.data);
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
