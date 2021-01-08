import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import LoginPage from '../auth/LoginPage';
import LoginPageF from '../auth/LoginPage/LoginPageRefact';
import PrivateRoute from '../auth/PrivateRoute';
import AdvertsPage from '../pages/AdvertsPage';
import AdvertDetailPage from '../pages/AdvertDetailPage';
import NewAdvertPage from '../pages/NewAdvertPage';
import NotFoundPage from '../pages/NotFoundPage';
import FlashMessage from '../shared/FlashMessage';

function App() {
  return (
    <div className="App">
      <FlashMessage />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/adverts" />
        </Route>
        <PrivateRoute path="/adverts" exact>
          <AdvertsPage />
        </PrivateRoute>
        <PrivateRoute path="/advert/:id" exact>
          <AdvertDetailPage />
        </PrivateRoute>
        <PrivateRoute path="/adverts/new" exact>
          <NewAdvertPage />
        </PrivateRoute>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/404" exact>
          <NotFoundPage />
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
