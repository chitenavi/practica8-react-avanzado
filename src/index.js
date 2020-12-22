import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App, { Root } from './components/App';
import storage from './utils/storage';
import { setupTokenClient } from './api/client';
import configureStore from './store';

import 'antd/dist/antd.css';
import './scss/index.scss';

const initialUserAuthToken = storage.get('userAuthToken') || null;

setupTokenClient(initialUserAuthToken);

const history = createBrowserHistory();
const store = configureStore(
  { auth: { isLogged: !!initialUserAuthToken } },
  { history },
);

const render = () => {
  ReactDOM.render(
    <Root store={store} history={history}>
      <App />
    </Root>,
    document.getElementById('root'),
  );
};

render();
