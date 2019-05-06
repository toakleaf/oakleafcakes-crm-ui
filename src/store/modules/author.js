import axios from '../../axiosAPI';

// The logged in account is the 'author'
// All other accounts are handled by account type's name,
// such as Employees and Customers

const state = {
  author: null,
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
  author: state => {
    return state.author;
  },
  authorID: state => {
    if (state.author) return state.author.id;
    return null;
  },
  authorFirstName: state => {
    if (state.author) return state.author.first_name;
    return null;
  },
  authorLastName: state => {
    if (state.author) return state.author.last_name;
    return null;
  },
  authorCompanyName: state => {
    if (state.author) return state.author.company_name;
    return null;
  },
  authorEmail: state => {
    if (state.author) return state.author.email;
    return null;
  },
  authorRole: state => {
    if (state.author) return state.author.role;
    return null;
  },
  authorPhone: state => {
    if (state.author) return state.author.phone;
    return null;
  },
  authorPhoneCountry: state => {
    if (state.author) return state.author.phone_country;
    return null;
  },
  authorPhoneType: state => {
    if (state.author) return state.author.phone_type;
    return null;
  },
  authorCreatedAt: state => {
    if (state.author) return state.authorCreatedAt;
    return null;
  },
  authorUpdatedAt: state => {
    if (state.author) return state.authorUpdatedAt;
    return null;
  }
};

const mutations = {
  setAuthorData: (state, payload) => {
    state.author = payload;
    state.authorCreatedAt = payload['created_at']
      ? new Date(payload['created_at'])
      : null;
    state.authorUpdatedAt = payload['updated_at']
      ? new Date(payload['updated_at'])
      : null;
    return;
  },
  clearAuthorData: state => {
    state.author = null;
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
        console.log(res.data);
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
