import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  UI_SET_NOTIFICATION,
  UI_REMOVE_NOTIFICATION,
  ADVERTS_TAGS_LOADED,
  ADVERTS_DELETE_REQUEST,
  ADVERTS_DELETE_SUCCESS,
  ADVERTS_DELETE_FAILURE,
} from './types';

import {
  authLoginSuccess,
  tagsLoaded,
  login,
  loadTags,
  advertsDeleteFailure,
  showFlashNotification,
  deleteAdvert,
} from './actions';

describe('authLoginSuccess', () => {
  it('should create an AUTH_LOGIN_SUCCESS action with auth={isLogged:true}', () => {
    const auth = {
      isLogged: true,
    };
    const expectedAction = {
      type: AUTH_LOGIN_SUCCESS,
      payload: auth,
    };

    const action = authLoginSuccess(auth);
    expect(action).toEqual(expectedAction);
  });
});

describe('advertsDeleteFailure', () => {
  it('should create an ADVERTS_DELETE_FAILURE action with error', () => {
    const error = {
      status: 401,
      message: 'Not found',
    };
    const expectedAction = {
      type: ADVERTS_DELETE_FAILURE,
      error: true,
      payload: error,
    };

    const action = advertsDeleteFailure(error);
    expect(action).toEqual(expectedAction);
  });
});

describe('tagsLoaded', () => {
  it('should create a TAGS_LOADED action with tags', () => {
    const tags = [];
    const expectedAction = {
      type: ADVERTS_TAGS_LOADED,
      payload: tags,
    };
    const action = tagsLoaded(tags);
    expect(action).toEqual(expectedAction);
  });
});

describe('login', () => {
  const credentials = 'credentials';
  const dispatch = jest.fn();
  const history = {
    push: jest.fn(),
  };
  const thunkAction = login(credentials);
  test('should dispatch an AUTH_LOGIN_SUCCESS action', async () => {
    const auth = {
      isLogged: true,
    };
    const api = { auth: { login: jest.fn().mockResolvedValue(auth) } };
    await thunkAction(dispatch, undefined, { api, history });

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: AUTH_LOGIN_REQUEST });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AUTH_LOGIN_SUCCESS,
      payload: auth,
    });

    expect(api.auth.login).toHaveBeenCalledWith(credentials);

    expect(history.push).toHaveBeenCalledWith('/adverts');
  });

  test('should dispatch an AUTH_LOGIN_FAILURE action', async () => {
    const error = 'error';
    const api = { auth: { login: jest.fn().mockRejectedValue(error) } };
    await thunkAction(dispatch, undefined, { api, history });

    expect(dispatch).toHaveBeenNthCalledWith(1, { type: AUTH_LOGIN_REQUEST });

    expect(dispatch).toHaveBeenNthCalledWith(2, {
      type: AUTH_LOGIN_FAILURE,
      error: true,
      payload: error,
    });

    expect(api.auth.login).toHaveBeenCalledWith(credentials);

    expect(history.push).not.toHaveBeenCalled();
  });
});

describe('loadTags', () => {
  const thunkAction = loadTags();
  const dispatch = jest.fn();
  const api = { adverts: { getAllTags: jest.fn() } };
  test('should dispatch a TAGS_LOADED action with tags', async () => {
    const tags = ['work', 'mobile'];
    api.adverts.getAllTags.mockResolvedValue(tags);

    await thunkAction(dispatch, undefined, { api });

    expect(api.adverts.getAllTags).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: ADVERTS_TAGS_LOADED,
      payload: tags,
    });
  });
  test('should dispatch a TAGS_LOADED action with empty array tags, error from api', async () => {
    const error = 'error';
    api.adverts.getAllTags.mockRejectedValue(error);
    await thunkAction(dispatch, undefined, { api });

    expect(api.adverts.getAllTags).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: ADVERTS_TAGS_LOADED,
      payload: [],
    });
  });
});

describe('deleteAdvert', () => {
  const advId = '1';
  const thunkAction = deleteAdvert(advId);
  const dispatch = jest.fn();
  const history = {
    push: jest.fn(),
  };
  const api = { adverts: { deleteAdvert: jest.fn() } };
  test('should dispatch an ADVERTS_DELETE_SUCCESS action with advert ID', async () => {
    api.adverts.deleteAdvert.mockResolvedValue();

    await thunkAction(dispatch, undefined, { api, history });

    expect(api.adverts.deleteAdvert).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: ADVERTS_DELETE_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ADVERTS_DELETE_SUCCESS,
      payload: advId,
    });
  });
});

describe('showFlashNotification', () => {
  const type = 'error';
  const message = 'error';
  const thunkAction = showFlashNotification(type, message);
  const dispatch = jest.fn();

  it('should dispatch an UI_SET_NOTIFICATION and UI_REMOVE_NOTIFICATION after 2 seconds', done => {
    thunkAction(dispatch);

    expect(dispatch).toHaveBeenNthCalledWith(1, {
      type: UI_SET_NOTIFICATION,
      payload: {
        type,
        message,
      },
    });

    setTimeout(() => {
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: UI_REMOVE_NOTIFICATION,
      });
      done();
    }, 2000);
  });
});
