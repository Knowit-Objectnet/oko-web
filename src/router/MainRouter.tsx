import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Dashboard } from '../sharedComponents/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logout } from '../pages/logout/Logout';
import { Loading } from '../sharedComponents/Loading';

export const MainRouter: React.FC = () => {
    const { initialized } = useKeycloak();

    if (!initialized) {
        return <Loading />;
    }

    return (
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
};
