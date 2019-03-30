import axios from '../../axiosAPI';
import router from '../../router';

// The logged in account is the 'author'
// All other accounts are handled by account type's name,
// such as Employees and Customers

const state = {
  authorID: null,
  authorFirstName: null,
  authorLastName: null,
  authorCompanyName: null,
  authorEmail: null,
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
    payload['created_at']
      ? (state.authorCreatedAt = payload['created_at'])
      : null;
    payload['updated_at']
      ? (state.authorUpdatedAt = payload['updated_at'])
      : null;
  }
};

const actions = {
  fetchAuthorData({ commit }) {
    axios
      .get('/account')
      .then(res => {
        commit('setAuthorData', res.data[0]);
      })
      .catch(err => console.error(err));
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
