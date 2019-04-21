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
  authorCreatedAt: null
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
  authorCreatedAt: state => {
    return state.authorCreatedAt;
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
    payload['role'] ? (state.authorRole = payload['role']) : null;
    payload['created_at']
      ? (state.authorCreatedAt = new Date(payload['created_at']))
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
