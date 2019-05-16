// https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5976808?start=0
import axios from '@/axiosAPI';

export const pushAccountUpdate = ({ dispatch, getters }, payload) => {
  if (!(payload && payload.update && payload.id))
    throw new Error('Account update info missing');
  return new Promise((resolve, reject) => {
    dispatch('setStatus', 'pending');
    axios
      .put(`/account/${payload.id}`, payload.update)
      .then(res => {
        dispatch('sendSuccessMessage', 'Successfully updated account!');

        if (getters.currentCustomerID === payload.id) {
          dispatch('fetchCurrentCustomer', payload.id);
        }
        if (getters.authorID === payload.id) {
          dispatch('fetchAuthorData');
        }
        resolve(res.data);
      })
      .catch(err => {
        console.error(err);
        dispatch('sendErrorMessage', 'Failed to update account.');
      });
  });
};

export const pushPasswordReset = ({ dispatch, getters }, payload) => {
  if (!(payload && payload.email))
    throw new Error('Account update info missing');
  return new Promise((resolve, reject) => {
    dispatch('setStatus', 'pending');
    axios
      .delete(`/account/password`, {
        data: {
          email: payload.email,
          ...(payload.lock ? { lock: payload.lock } : {})
        }
      })
      .then(res => {
        dispatch(
          'sendSuccessMessage',
          `${
            payload.lock
              ? 'Password deleted successfully.'
              : 'Password reset email sent!'
          }`
        );

        resolve(res.data);
      })
      .catch(err => {
        console.error(err);
        dispatch(
          'sendErrorMessage',
          `${
            payload.lock
              ? 'Failed to delete password.'
              : 'Failed to send password reset email'
          }`
        );
      });
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
      dispatch('sendSuccessMessage', 'Email address deleted successfully!');
      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    })
    .catch(err => {
      console.error(err);
      dispatch('sendErrorMessage', 'Failed to delete email address.');
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
      dispatch('sendSuccessMessage', 'Phone number deleted successfully!');
      if (getters.currentCustomerID === payload.id) {
        dispatch('fetchCurrentCustomer', payload.id);
      }
      if (getters.authorID === payload.id) {
        dispatch('fetchAuthorData');
      }
    })
    .catch(err => {
      console.error(err);
      dispatch('sendErrorMessage', 'Failed to delete phone number.');
    });
};
