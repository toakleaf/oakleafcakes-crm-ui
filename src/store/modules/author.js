import axios from '@/axiosAPI';

// The logged in account is the 'author'
// All other accounts are handled by account type's name,
// such as Employees and Customers

const state = {
  author: null,
  authorID: null,
  authorRole: null,
  authorFirstName: null,
  authorLastName: null,
  authorCompanyName: null,
  authorWorkingEmail: null,
  authorWorkingPhone: null
};

const getters = {
  author: state => {
    return state.author;
  },
  authorID: state => {
    return state.authorID;
  },
  authorRole: state => {
    return state.authorRole;
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
  authorWorkingEmail: state => {
    return state.authorWorkingEmail;
  },
  authorWorkingPhone: state => {
    return state.authorWorkingPhone;
  }
};

const mutations = {
  setAuthorData: (state, payload) => {
    if (!payload) {
      state.author = null;
      state.authorID = null;
      state.authorRole = null;
      state.authorFirstName = null;
      state.authorLastName = null;
      state.authorCompanyName = null;
      state.authorWorkingEmail = null;
      state.authorWorkingPhone = null;
      return;
    }
    state.author = payload;
    state.authorID = payload.id;
    state.authorRole = payload.role;
    state.authorFirstName = payload.first_name;
    state.authorLastName = payload.last_name;
    state.authorCompanyName = payload.company_name;

    if (payload.emails && payload.emails.length > 0) {
      state.author.emails = payload.emails.sort((a, b) =>
        a.is_primary ? -1 : 1
      );
      state.author.emails = state.author.emails.map(e => {
        if (!(e.created_at && e.updated_at)) return e;
        return {
          ...e,
          created_at: new Date(e.created_at),
          updated_at: new Date(e.updated_at)
        };
      });
      state.authorWorkingEmail = state.author.emails[0].email;
    }
    if (payload.logins && payload.logins.length > 0) {
      state.author.logins = payload.logins.sort((a, b) =>
        a.is_active ? -1 : 1
      );
      state.author.logins = state.author.logins.map(e => {
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
      state.author.phones = state.author.phones.map(p => {
        if (!(p.created_at && p.updated_at)) return p;
        return {
          ...p,
          created_at: new Date(p.created_at),
          updated_at: new Date(p.updated_at)
        };
      });
      state.authorWorkingPhone = state.author.phones[0].phone;
    }

    if (payload.email) state.authorWorkingEmail = payload.email;
    if (payload.phone) state.authorWorkingPhone = payload.phone;

    if (payload.created_at)
      state.author.created_at = new Date(payload.created_at);
    if (payload.updated_at)
      state.author.updated_at = new Date(payload.updated_at);

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
      .catch(err => {
        console.error(err);
        dispatch(
          'setErrorMessage',
          'Error: Failed to gather author data. Check connection.'
        );
        dispatch('setStatus', 'error');
      });
  },
  setAuthorData({ commit }, payload) {
    commit('setAuthorData', payload);
  },
  clearAuthorData({ commit }) {
    commit('setAuthorData', null);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
