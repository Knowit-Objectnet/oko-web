import React from 'react';
import {Switch, Route, Router, Redirect} from 'react-router-dom';

// History
import { historyObj } from './historyObj';
import {AuthenticatedRoute} from "./AuthenticatedRoute";

// Dashboard wrapper
import { Dashboard } from '../sharedComponents/Dashboard/Dashboard';

// Pages
import { Login } from '../pages/login/Login';
import { CalendarPage } from '../pages/calendar/Calendar';

export const RouterComponent: React.FC = () => (
    <Router history={historyObj}>
        <Switch>
            <AuthenticatedRoute path="/login" not={<Login />} is={<Redirect to='/' />} />
            {/* React-router v5 doesnt support nested switches
               so this is the best solution until v6 is out. */}
            <Route
                path="/"
                render={(props) => (
                    <Dashboard>
                        <Route exact path={`${props.match.url}`}>
                            Hello World!
                        </Route>
                        <Route exact path={`${props.match.url}calendar`} component={CalendarPage} />
                        <Route exact path={`${props.match.url}history`}>
                            Hello history!
                        </Route>
                        <Route exact path={`${props.match.url}partners`}>
                            Hello partners!
                        </Route>
                        <Route exact path={`${props.match.url}reporting`}>
                            Hello reporting!
                        </Route>
                        <Route exact path={`${props.match.url}deviations`}>
                            Hello deviations!
                        </Route>
                        <Route exact path={`${props.match.url}info`}>
                            Hello info!
                        </Route>
                    </Dashboard>
                )}
            />
        </Switch>
    </Router>
);
