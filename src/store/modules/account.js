import axios from '../../axiosAPI';
import router from '../../router';

const state = {
  accountID: null,
  accountFirstName: null,
  accountLastName: null,
  accountCompanyName: null,
  accountEmail: null,
  accountCreatedAt: null,
  accountUpdatedAt: null
};

const getters = {
  accountID: state => {
    return state.accountID;
  },
  accountFirstName: state => {
    return state.accountFirstName;
  },
  accountLastName: state => {
    return state.accountLastName;
  },
  accountCompanyName: state => {
    return state.accountCompanyName;
  },
  accountEmail: state => {
    return state.accountEmail;
  },
  accountCreatedAt: state => {
    return state.accountCreatedAt;
  },
  accountUpdatedAt: state => {
    return state.accountUpdatedAt;
  }
};

const mutations = {
  setAccountData: (state, payload) => {
    console.log(payload['company_name']);
    payload['id'] ? (state.accountID = payload['id']) : null;
    payload['first_name']
      ? (state.accountFirstName = payload['first_name'])
      : null;
    payload['last_name']
      ? (state.accountLastName = payload['last_name'])
      : null;
    payload['company_name']
      ? (state.accountCompanyName = payload['company_name'])
      : null;
    payload['email'] ? (state.accountEmail = payload['email']) : null;
    payload['created_at']
      ? (state.accountCreatedAt = payload['created_at'])
      : null;
    payload['updated_at']
      ? (state.accountUpdatedAt = payload['updated_at'])
      : null;
  }
};

const actions = {
  fetchAccountData({ commit }) {
    axios
      .get('/account')
      .then(res => {
        console.log(res.data[0]);
        commit('setAccountData', res.data[0]);
      })
      .catch(err => console.error(err));
  },
  setAccountData({ commit }, payload) {
    commit('setAccountData', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
