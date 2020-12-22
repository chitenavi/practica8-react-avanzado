import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from './types';

/** AUTH ACTIONS */

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});

export const authLoginSuccess = auth => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: auth,
});

export const login = crendentials => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { history, api }) {
    dispatch(authLoginRequest());
    try {
      await api.auth.login(crendentials);
      dispatch(authLoginSuccess({ isLogged: true }));
      history.push('/adverts');
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
