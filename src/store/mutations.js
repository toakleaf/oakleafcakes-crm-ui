export const setStatus = (state, payload) => {
  if (!payload) return (state.status = null);
  const out = payload.toLowerCase();
  if (out === 'success' || out === 'error' || out === 'pending')
    return (state.status = out);
  state.status = null;
};

export const setSuccessMessage = (state, payload) => {
  if (!payload) return (state.SuccessMessage = 'Request successful!');
  state.SuccessMessage = payload;
};

export const setErrorMessage = (state, payload) => {
  if (!payload) return (state.errorMessage = 'Request failed.');
  state.errorMessage = payload;
};
