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
