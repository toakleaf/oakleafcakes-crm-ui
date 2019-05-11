import axios from '@/axiosAPI';

// The logged in account is the 'author'
// All other accounts are handled by account type's name,
// such as Employees and Customers

const state = {
  author: null
};

const getters = {
  author: state => {
    return state.author;
  },
  authorID: state => {
    return state.author ? state.author.id : null;
  }
};

const mutations = {
  setAuthorData: (state, payload) => {
    state.author = payload;

    if (state.author.emails && state.author.emails.length > 0) {
      state.author.emails = state.author.emails.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.author.emails.map(e => {
        if (!(e.created_at && e.updated_at)) return e;
        return {
          ...e,
          created_at: new Date(e.created_at),
          updated_at: new Date(e.updated_at)
        };
      });
    }
    if (state.author.phones && state.author.phones.length > 0) {
      state.author.phones = state.author.phones.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.author.phones.map(p => {
        if (!(p.created_at && p.updated_at)) return p;
        return {
          ...p,
          created_at: new Date(p.created_at),
          updated_at: new Date(p.updated_at)
        };
      });
    }
    if (state.author.logins && state.author.logins.length > 0) {
      state.author.logins = state.author.logins.sort((a, b) =>
        a.is_active ? -1 : 1
      );
      state.author.logins.map(l => {
        if (!(l.created_at && l.updated_at)) return l;
        return {
          ...l,
          created_at: new Date(l.created_at),
          updated_at: new Date(l.updated_at)
        };
      });
    }
    if (state.author.created_at)
      state.author.created_at = new Date(state.author.created_at);
    if (state.author.updated_at)
      state.author.updated_at = new Date(state.author.updated_at);

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
