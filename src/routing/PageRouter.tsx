import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../auth/Roles';

const Calendar = React.lazy(() => import('../pages/calendar'));
const Avtaler = React.lazy(() => import('../pages/avtaler'));

const Home: React.FC = () => {
    // const { user } = useAuth();
    return /*user.isAdmin ? <Redirect to="/oversikt" /> :*/ <Redirect to="/kalender" />;
};

export const PageRouter: React.FC = () => (
    <Switch>
        <Route path="/kalender/:view?">
            <Calendar />
        </Route>
        <ProtectedRoute path="/avtaler" requiredRoles={[Roles.Admin]}>
            <Avtaler />
        </ProtectedRoute>
        <Route path="/">
            <Home />
        </Route>
        <Redirect to="/" />
    </Switch>
);
