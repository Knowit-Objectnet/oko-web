import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Logout } from '../pages/Logout';
import { Loading } from '../components/Loading';
import { Dashboard } from '../pages/dashboard/Dashboard';

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
