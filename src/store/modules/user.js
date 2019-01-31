import axios from '../../axiosAPI';
import router from '../../router';

const state = {
  userID: null,
  userFirstName: null,
  userLastName: null,
  userDisplayName: null,
  userEmail: null,
  userCreatedAt: null,
  userUpdatedAt: null
};

const getters = {
  userID: state => {
    return state.userID;
  },
  userFirstName: state => {
    return state.userFirstName;
  },
  userLastName: state => {
    return state.userLastName;
  },
  userDisplayName: state => {
    return state.userDisplayName;
  },
  userEmail: state => {
    return state.userEmail;
  },
  userCreatedAt: state => {
    return state.userCreatedAt;
  },
  userUpdatedAt: state => {
    return state.userUpdatedAt;
  }
};

const mutations = {
  setUserData: (state, payload) => {
    payload['id'] ? (state.userID = payload['id']) : null;
    payload['first_name']
      ? (state.userFirstName = payload['first_name'])
      : null;
    payload['last_name'] ? (state.userLastName = payload['last_name']) : null;
    payload['display_name']
      ? (state.userDisplayName = payload['display_name'])
      : null;
    payload['email'] ? (state.userEmail = payload['email']) : null;
    payload['created_at']
      ? (state.userCreatedAt = payload['created_at'])
      : null;
    payload['updated_at']
      ? (state.userUpdatedAt = payload['updated_at'])
      : null;
  }
};

const actions = {
  fetchUserData({ commit }) {
    axios
      .get('/user')
      .then(res => {
        commit('setUserData', res.data);
      })
      .catch(err => console.error(err));
  },
  setUserData({ commit }, payload) {
    commit('setUserData', payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
