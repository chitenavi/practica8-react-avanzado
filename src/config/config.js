import { setupTokenClient } from '../api/client';
import storage from '../utils/storage';

export const getPreloadedState = async () => {
  const initialUserAuthToken = storage.get('userAuthToken') || null;

  if (initialUserAuthToken) {
    try {
      setupTokenClient(initialUserAuthToken);
      return { auth: { isLogged: true } };
    } catch (error) {
      return { ui: { error } };
    }
  }
  return {};
};

export const advertsConfig = {
  apiUrl: process.env.REACT_APP_API_URL,
  defaultFilter: {
    name: '',
    type: 'all',
    price: [1, 10000],
    tags: [],
  },
};

export const formLogin = {
  email: '',
  password: '',
  remcredentials: false,
  validateFields: ['email', 'password'],
};

export const formNewAd = {
  name: '',
  sale: true,
  tags: [],
  price: 0,
  file: null,
  validateFields: ['name', 'tags', 'price'],
};
