import client from './client';
import storage from '../utils/storage';

export const login = credentials =>
  client.login(credentials).then(token => {
    if (credentials.remcredentials) storage.set('userAuthToken', token);
    return token;
  });

export const logout = () =>
  client.logout().then(() => {
    storage.remove('userAuthToken');
    storage.remove('userFilterForm');
  });
