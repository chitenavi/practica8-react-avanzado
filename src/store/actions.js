import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_SET_NOTIFICATION,
  UI_REMOVE_NOTIFICATION,
} from './types';

/** UI ACTIONS */
export const uiSetFlash = (type, message) => {
  return {
    type: UI_SET_NOTIFICATION,
    payload: {
      type,
      message,
    },
  };
};

export const uiRemoveFlash = () => {
  return {
    type: UI_REMOVE_NOTIFICATION,
  };
};

export const showFlashNotification = (
  type,
  message,
  timeout = 2000,
) => dispatch => {
  dispatch(uiSetFlash(type, message));

  setTimeout(() => {
    dispatch(uiRemoveFlash());
  }, timeout);
};

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
      await dispatch(authLoginSuccess({ isLogged: true }));
      dispatch(showFlashNotification('success', 'Login Correcto!'));

      // history.push('/adverts');
    } catch (error) {
      dispatch(showFlashNotification('error', `Error: ${error.message}!`));
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};
