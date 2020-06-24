import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

// History
import { historyObj } from './historyObj';

// Pages
import { Login } from '../pages/login/Login';
import { CalendarPage } from '../pages/calendar/Calendar';

export const RouterComponent: React.FC = () => (
    <Router history={historyObj}>
        <Switch>
            <Route exact path="/">
                <h1>Hello World!</h1>
            </Route>
            <Route path="/login" component={Login} />
        </Switch>
    </Router>
);
