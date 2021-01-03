import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_SET_NOTIFICATION,
  UI_REMOVE_NOTIFICATION,
  ADVERTS_API_REQUEST,
  ADVERTS_API_FAILURE,
  ADVERTS_TAGS_LOADED,
  ADVERTS_LOAD_ADS_SUCCESS,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_CREATE_SUCCESS,
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

/** ADVERTS ACTIONS */
export const advertsApiRequest = () => ({
  type: ADVERTS_API_REQUEST,
});

export const advertsApiFailure = error => ({
  type: ADVERTS_API_FAILURE,
  error: true,
  payload: error,
});

export const tagsLoaded = tags => {
  return {
    type: ADVERTS_TAGS_LOADED,
    payload: {
      tags,
    },
  };
};

export const loadTags = () => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { api }) {
    try {
      const tags = await api.adverts.getAllTags();
      dispatch(tagsLoaded(tags));
    } catch (error) {
      dispatch(tagsLoaded([]));
    }
  };
};

export const advertsLoadSuccess = ads => ({
  type: ADVERTS_LOAD_ADS_SUCCESS,
  payload: {
    ads,
  },
});

export const loadAdverts = formFilter => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { api }) {
    dispatch(advertsApiRequest());
    try {
      const { rows: ads } = await api.adverts.getAdverts(formFilter);
      dispatch(advertsLoadSuccess(ads));
    } catch (error) {
      dispatch(advertsApiFailure(error));
    }
  };
};

export const advertDeleteSuccess = () => ({
  type: ADVERTS_DELETE_SUCCESS,
});

export const deleteAdvert = advertId => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { history, api }) {
    dispatch(advertsApiRequest());
    try {
      await api.adverts.deleteAdvert(advertId);

      await dispatch(advertDeleteSuccess());
      await dispatch(
        showFlashNotification('success', 'Advert deleted successfuly!'),
      );
      history.push('/adverts');
    } catch (error) {
      await dispatch(advertsApiFailure(error));
      await dispatch(showFlashNotification('error', 'Advert was not deleted!'));
    }
  };
};

export const advertCreateSuccess = () => ({
  type: ADVERTS_CREATE_SUCCESS,
});

export const createAdvert = advertData => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { history, api }) {
    dispatch(advertsApiRequest());
    try {
      const newAd = await api.adverts.createAdvert(advertData);

      await dispatch(advertCreateSuccess());
      await dispatch(
        showFlashNotification('success', 'Advert created successfuly!'),
      );
      await dispatch(loadAdverts());
      history.push(`/advert/${newAd._id}`);
    } catch (error) {
      await dispatch(advertsApiFailure(error));
      await dispatch(showFlashNotification('error', 'Advert was not created!'));
    }
  };
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
      dispatch(
        showFlashNotification('success', 'Hello!. Welcome to Nodepop SPA'),
      );
      await dispatch(loadTags());
      await dispatch(loadAdverts());

      history.push('/adverts');
    } catch (error) {
      await dispatch(showFlashNotification('error', `${error.message}!`));
      dispatch(authLoginFailure(error));
    }
  };
};

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

export const logout = () => {
  // eslint-disable-next-line func-names
  return function (dispatch, getState, { api }) {
    try {
      api.auth.logout().then(() => {
        dispatch(authLogout());
        dispatch(
          showFlashNotification(
            'success',
            'Good bye!. We hope you come back soon!',
          ),
        );
      });
    } catch (error) {
      dispatch(showFlashNotification('error', `${error.message}!`));
    }
  };
};
