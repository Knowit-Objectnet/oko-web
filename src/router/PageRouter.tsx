import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../types';
import { Notifications } from '../pages/notifications/Notifications';
import { Calendar } from '../pages/calendar/Calendar';
import { WeightReporting } from '../pages/weightReporting/WeightReporting';

const HomePage: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);
    return userIsAdmin ? <Redirect to="/oversikt" /> : <Redirect to="/kalender" />;
};

export const PageRouter: React.FC = () => (
    <Switch>
        <Route path="/kalender">
            <Calendar />
        </Route>
        <ProtectedRoute path="/oversikt" requiredRoles={[Roles.Oslo]}>
            <Notifications />
        </ProtectedRoute>
        <ProtectedRoute path="/varsler" requiredRoles={[Roles.Partner, Roles.Ambassador]}>
            <Notifications />
        </ProtectedRoute>
        <ProtectedRoute path="/vektuttak" requiredRoles={[Roles.Partner]}>
            <WeightReporting />
        </ProtectedRoute>
        <Route path="/">
            <HomePage />
        </Route>
        <Redirect to="/" />
    </Switch>
);
