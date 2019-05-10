import axios from '../../axiosAPI';

// The logged in account is the 'author'
// All other accounts are handled by account type's name,
// such as Employees and Customers

const state = {
  author: null
};

const getters = {
  author: state => {
    return state.author;
  }
};

const mutations = {
  setAuthorData: (state, payload) => {
    state.author = payload;
    if (state.author.emails)
      state.author.emails = state.author.emails.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
    if (state.author.phones)
      state.author.phones = state.author.phones.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
    return;
  },
  clearAuthorData: state => {
    state.author = null;
    return;
  }
};

const actions = {
  fetchAuthorData({ commit }) {
    axios
      .get('/account')
      .then(res => {
        commit('setAuthorData', res.data);
      })
      .catch(err => console.error('Error: ' + err));
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
