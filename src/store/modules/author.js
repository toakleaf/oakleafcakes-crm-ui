import axios from '../../axiosAPI';

// The logged in account is the 'author'
// All other accounts are handled by account type's name,
// such as Employees and Customers

const state = {
  authorID: null,
  authorFirstName: null,
  authorLastName: null,
  authorCompanyName: null,
  authorEmail: null,
  authorRole: null,
  authorPhone: null,
  authorPhoneCountry: null,
  authorPhoneType: null,
  authorCreatedAt: null,
  authorUpdatedAt: null
};

const getters = {
  authorID: state => {
    return state.authorID;
  },
  authorFirstName: state => {
    return state.authorFirstName;
  },
  authorLastName: state => {
    return state.authorLastName;
  },
  authorCompanyName: state => {
    return state.authorCompanyName;
  },
  authorEmail: state => {
    return state.authorEmail;
  },
  authorRole: state => {
    return state.authorRole;
  },
  authorPhone: state => {
    return state.authorPhone;
  },
  authorPhoneCountry: state => {
    return state.authorPhoneCountry;
  },
  authorPhoneType: state => {
    return state.authorPhoneType;
  },
  authorCreatedAt: state => {
    return state.authorCreatedAt;
  },
  authorUpdatedAt: state => {
    return state.authorUpdatedAt;
  }
};

const mutations = {
  setAuthorData: (state, payload) => {
    payload['id'] ? (state.authorID = payload['id']) : null;
    payload['first_name']
      ? (state.authorFirstName = payload['first_name'])
      : null;
    payload['last_name'] ? (state.authorLastName = payload['last_name']) : null;
    payload['company_name']
      ? (state.authorCompanyName = payload['company_name'])
      : null;
    payload['email'] ? (state.authorEmail = payload['email']) : null;
    payload['phone'] ? (state.authorPhone = payload['phone']) : null;
    payload['phone_country']
      ? (state.authorPhoneCountry = payload['phone_country'])
      : null;
    payload['phone_type']
      ? (state.authorPhoneType = payload['phone_type'])
      : null;
    payload['role'] ? (state.authorRole = payload['role']) : null;
    payload['created_at']
      ? (state.authorCreatedAt = new Date(payload['created_at']))
      : null;
    payload['updated_at']
      ? (state.authorUpdatedAt = new Date(payload['updated_at']))
      : null;
    return;
  },
  clearAuthorData: state => {
    state.authorID = null;
    state.authorFirstName = null;
    state.authorLastName = null;
    state.authorCompanyName = null;
    state.authorEmail = null;
    state.authorRole = null;
    state.authorCreatedAt = null;
    state.authorUpdatedAt = null;
    return;
  }
};

const actions = {
  fetchAuthorData({ commit }) {
    axios
      .get('/account')
      .then(res => {
        commit('setAuthorData', res.data[0]);
      })
      .catch(err => console.error('hi: ' + err));
  },
  setAuthorData({ commit }, payload) {
    commit('setAuthorData', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
