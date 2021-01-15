import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  UI_SET_NOTIFICATION,
  UI_REMOVE_NOTIFICATION,
  ADVERTS_TAGS_LOADED,
  ADVERTS_LOAD_REQUEST,
  ADVERTS_LOAD_SUCCESS,
  ADVERTS_LOAD_FAILURE,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_DELETE_FAILURE,
  ADVERTS_CREATE_REQUEST,
  ADVERTS_CREATE_SUCCESS,
  ADVERTS_CREATE_FAILURE,
  ADVERT_LOAD_DET_REQUEST,
  ADVERT_LOAD_DET_SUCCESS,
  ADVERT_LOAD_DET_FAILURE,
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

// UI THUNKS
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
export const advertsLoadRequest = () => ({
  type: ADVERTS_LOAD_REQUEST,
});
export const advertsCreateRequest = () => ({
  type: ADVERTS_CREATE_REQUEST,
});
export const advertsDeleteRequest = () => ({
  type: ADVERTS_DELETE_REQUEST,
});
export const advertLoadDetRequest = () => ({
  type: ADVERT_LOAD_DET_REQUEST,
});

export const advertsLoadFailure = error => ({
  type: ADVERTS_LOAD_FAILURE,
  error: true,
  payload: error,
});
export const advertsCreateFailure = error => ({
  type: ADVERTS_CREATE_FAILURE,
  error: true,
  payload: error,
});
export const advertsDeleteFailure = error => ({
  type: ADVERTS_DELETE_FAILURE,
  error: true,
  payload: error,
});
export const advertLoadDetFailure = error => ({
  type: ADVERT_LOAD_DET_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoadSuccess = ads => ({
  type: ADVERTS_LOAD_SUCCESS,
  payload: ads,
});
export const advertsCreateSuccess = ad => ({
  type: ADVERTS_CREATE_SUCCESS,
  payload: ad,
});
export const advertsDeleteSuccess = adId => ({
  type: ADVERTS_DELETE_SUCCESS,
  payload: adId,
});
export const advertLoadDetSuccess = adDetail => ({
  type: ADVERT_LOAD_DET_SUCCESS,
  payload: adDetail,
});

export const tagsLoaded = tags => {
  return {
    type: ADVERTS_TAGS_LOADED,
    payload: tags,
  };
};

// ADVERTS THUNKS
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

export const loadAdverts = formFilter => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { api }) {
    dispatch(advertsLoadRequest());
    try {
      const { rows: ads } = await api.adverts.getAdverts(formFilter);
      dispatch(advertsLoadSuccess(ads));
    } catch (error) {
      dispatch(advertsLoadFailure(error));
    }
  };
};

export const deleteAdvert = advertId => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { history, api }) {
    dispatch(advertsDeleteRequest());
    try {
      await api.adverts.deleteAdvert(advertId);

      await dispatch(advertsDeleteSuccess(advertId));
      dispatch(showFlashNotification('success', 'Advert deleted successfuly!'));
      history.push('/adverts');
    } catch (error) {
      await dispatch(advertsDeleteFailure(error));
      dispatch(showFlashNotification('error', 'Advert was not deleted!'));
    }
  };
};

export const createAdvert = advertData => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { history, api }) {
    dispatch(advertsCreateRequest());
    try {
      const newAd = await api.adverts.createAdvert(advertData);

      await dispatch(advertsCreateSuccess(newAd));
      dispatch(showFlashNotification('success', 'Advert created successfuly!'));
      history.push(`/advert/${newAd._id}`);
    } catch (error) {
      await dispatch(advertsCreateFailure(error));
      dispatch(showFlashNotification('error', 'Advert was not created!'));
    }
  };
};

export const loadAdvertDet = adId => {
  // eslint-disable-next-line func-names
  return async function (dispatch, getState, { api }) {
    dispatch(advertLoadDetRequest());
    try {
      const adDetail = await api.adverts.getAdvertDetail(adId);
      dispatch(advertLoadDetSuccess(adDetail));
    } catch (error) {
      await dispatch(advertsLoadFailure(error));
      dispatch(showFlashNotification('error', error.message));
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

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT,
  };
};

// AUTH THUNKS
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
      history.push('/adverts');
    } catch (error) {
      await dispatch(authLoginFailure(error));
      dispatch(showFlashNotification('error', `${error.message}!`));
    }
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
