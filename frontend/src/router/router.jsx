import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

// History
import { history } from './history';

const RouterComponent = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/">
        <h1>
          Hello World!
        </h1>
      </Route>
    </Switch>
  </Router>
);

export {
  RouterComponent as Router,
};
