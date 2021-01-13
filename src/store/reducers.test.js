import {
  ADVERTS_TAGS_LOADED,
  ADVERTS_LOAD_REQUEST,
  ADVERTS_LOAD_FAILURE,
} from './types';

import { adverts, ui } from './reducers';

describe('adverts', () => {
  it('should handle a ADVERTS_TAGS_LOADED action', () => {
    const state = {
      ads: null,
      tags: [],
    };
    const action = {
      type: ADVERTS_TAGS_LOADED,
      payload: ['mobile', 'work'],
    };
    const expectedState = {
      ads: null,
      tags: ['mobile', 'work'],
    };
    expect(adverts(state, action)).toEqual(expectedState);
  });

  it('should handle ANY action', () => {
    const state = {};
    const action = {
      type: 'ANY',
    };
    expect(adverts(state, action)).toEqual(state);
  });
});

describe('ui', () => {
  it('should handle a ADVERTS_LOAD_REQUEST action', () => {
    const state = {
      loading: false,
      error: null,
      notification: {},
    };
    const action = {
      type: ADVERTS_LOAD_REQUEST,
    };
    const expectedState = {
      ...state,
      loading: true,
    };
    expect(ui(state, action)).toEqual(expectedState);
  });

  it('should handle a ADVERTS_LOAD_FAILURE action', () => {
    const state = {
      loading: true,
      error: null,
      notification: {},
    };
    const action = {
      type: ADVERTS_LOAD_FAILURE,
      error: true,
      payload: { status: 404, message: 'Not found' },
    };
    const expectedState = {
      ...state,
      loading: false,
      error: { status: 404, message: 'Not found' },
    };
    expect(ui(state, action)).toEqual(expectedState);
  });

  it('should handle ANY action', () => {
    const state = {};
    const action = {
      type: 'ANY',
    };
    expect(ui(state, action)).toEqual(state);
  });
});
