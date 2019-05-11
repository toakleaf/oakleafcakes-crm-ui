// https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5976808?start=0
import axios from '@/axiosAPI';

export const pushAccountUpdate = ({ dispatch, getters }, payload) => {
  if (!payload && !(payload.update || payload.id))
    throw new Error('Account update info missing');
  axios.put(`/account/${payload.id}`, payload.update).then(res => {
    if (res.status !== 200) {
      alert('Failed to update account');
      throw new Error('Failed to update account');
    }
    if (getters.currentCustomerID === payload.id) {
      dispatch('fetchCurrentCustomer', payload.id);
    }
    if (getters.authorID === payload.id) {
      dispatch('fetchAuthorData');
    }
  });
};

export const deleteAccountEmail = ({ dispatch, getters }, payload) => {
  if (!payload && !(payload.emails && payload.id))
    throw new Error('Account update info missing');
  axios
    .delete(`/account/email/${payload.id}`, {
      data: { emails: payload.emails }
    })
    .then(res => {
      if (res.status !== 200) {
        alert('Failed to update account');
        throw new Error('Failed to update account');
      }
      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    });
};

export const deleteAccountPhone = ({ dispatch, getters }, payload) => {
  if (!payload && !(payload.phones && payload.id))
    throw new Error('Account update info missing');
  axios
    .delete(`/account/phone/${payload.id}`, {
      data: { phones: payload.phones }
    })
    .then(res => {
      if (res.status !== 200) {
        alert('Failed to update account');
        throw new Error('Failed to update account');
      }
      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    });
};
