import * as types from './types';

const defaultState = {
  auth: {
    isLogged: false,
  },
  ui: {
    loading: false,
    error: null,
    notification: {
      type: '',
      message: '',
    },
  },
};

export const auth = (state = defaultState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      // login
      return action.payload;
    case types.AUTH_LOGOUT:
      // logout
      return { ...state, isLogged: false };
    default:
      return state;
  }
};

export const ui = (state = defaultState.ui, action) => {
  if (action.error) {
    return { ...state, error: action.payload, loading: false };
  }
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.AUTH_LOGIN_SUCCESS:
      return { ...state, error: null, loading: false };
    case types.UI_SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case types.UI_REMOVE_NOTIFICATION:
      return {
        ...state,
        notification: {
          type: '',
          message: '',
        },
      };
    default:
      return state;
  }
};
