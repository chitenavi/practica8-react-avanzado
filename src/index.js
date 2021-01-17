import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';

import App, { Root } from './components/App';
import configureStore from './store';
import { getPreloadedState } from './config/config';

import './scss/index.scss';

const render = async () => {
  const preloadedState = await getPreloadedState();
  const history = createBrowserHistory();
  const store = configureStore(preloadedState, { history });

  ReactDOM.render(
    <Root store={store} history={history}>
      <App />
    </Root>,
    document.getElementById('root'),
  );
};

render();
