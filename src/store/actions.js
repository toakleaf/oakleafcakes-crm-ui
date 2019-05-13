// https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5976808?start=0
import axios from '@/axiosAPI';

export const setStatus = ({ commit }, payload) => {
  if (!payload) return;
  commit('setStatus', payload);
};

export const pushAccountUpdate = ({ dispatch, getters }, payload) => {
  if (!payload && !(payload.update || payload.id))
    throw new Error('Account update info missing');
  dispatch('setStatus', 'pending');
  axios
    .put(`/account/${payload.id}`, payload.update)
    .then(res => {
      dispatch('setStatus', 'success');

      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    })
    .catch(err => {
      console.error(err);
      dispatch('setStatus', 'error');
    });
};

export const deleteAccountEmail = ({ dispatch, getters }, payload) => {
  if (!payload && !(payload.emails && payload.id))
    throw new Error('Account update info missing');
  dispatch('setStatus', 'pending');
  axios
    .delete(`/account/email/${payload.id}`, {
      data: { emails: payload.emails }
    })
    .then(res => {
      dispatch('setStatus', 'success');
      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    })
    .catch(err => {
      console.error(err);
      dispatch('setStatus', 'error');
    });
};

export const deleteAccountPhone = ({ dispatch, getters }, payload) => {
  if (!payload && !(payload.phones && payload.id))
    throw new Error('Account update info missing');
  dispatch('setStatus', 'pending');
  axios
    .delete(`/account/phone/${payload.id}`, {
      data: { phones: payload.phones }
    })
    .then(res => {
      dispatch('setStatus', 'success');
      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    })
    .catch(err => {
      console.error(err);
      dispatch('setStatus', 'error');
    });
};
