import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';

// History
import { historyObj } from './historyObj';
// Dashboard wrapper
import { Dashboard } from '../sharedComponents/Dashboard/Dashboard';

// Pages
import { Login } from '../pages/login/Login';

export const RouterComponent: React.FC = () => (
    <Router history={historyObj}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route
                path="/"
                render={(props) => (
                    <Dashboard>
                        <Route exact path={`${props.match.url}/`}>
                            "Hello World!"
                        </Route>
                        <Route exact path={`${props.match.url}/calendar`}>
                            "Hello World!"
                        </Route>
                        <Route exact path={`${props.match.url}/history`}>
                            "Hello World!"
                        </Route>
                        <Route exact path={`${props.match.url}/partners`}>
                            "Hello World!"
                        </Route>
                        <Route exact path={`${props.match.url}/info`}>
                            "Hello World!"
                        </Route>
                    </Dashboard>
                )}
            />
        </Switch>
    </Router>
);
