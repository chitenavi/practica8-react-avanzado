import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL,
});

const setAuthorizationHeader = token => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common.Authorization;
};

client.login = credentials =>
  client.post('/apiv1/auth/login', credentials).then(token => {
    setAuthorizationHeader(token);
    return token;
  });

// Logout method
client.logout = () =>
  new Promise(resolve => {
    // Remove Authorization header
    removeAuthorizationHeader();
    resolve();
  });

client.interceptors.response.use(
  response => {
    // console.log(response);
    if (!response.data.ok)
      return Promise.reject(
        new Error(response.data.error || 'Something went wrong!!'),
      );

    if (response.data.token) return response.data.token;

    return response.data.result;
  },
  error => {
    return Promise.reject(error);
  },
);

export const setupTokenClient = token => {
  if (token) {
    setAuthorizationHeader(token);
  }
};

export default client;
