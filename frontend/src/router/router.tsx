import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

// History
import { historyObj } from './historyObj';

export const RouterComponent: React.FC = () => (
    <Router history={historyObj}>
        <Switch>
            <Route exact path="/">
                <h1>Hello World!</h1>
            </Route>
        </Switch>
    </Router>
);
