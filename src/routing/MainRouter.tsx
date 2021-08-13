import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logout } from '../pages/Logout';
import { Dashboard } from '../pages/dashboard/Dashboard';

export const MainRouter: React.FC = () => (
    <Router>
        <Switch>
            <Route path="/loggut">
                <Logout />
            </Route>
            <Route>
                <Dashboard />
            </Route>
        </Switch>
    </Router>
);
