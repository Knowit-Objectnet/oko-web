import React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../types';
import { Notifications } from '../pages/notifications/Notifications';
import { Calendar } from '../pages/calendar/Calendar';
import { Stations } from '../pages/stations/Stations';
import { WeightReporting } from '../pages/weightReporting/WeightReporting';
import { UserProfile } from '../pages/userProfile/UserProfile';

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
        <ProtectedRoute path="/statistikk" requiredRoles={[Roles.Oslo]}>
            <h1>Statistikk</h1>
        </ProtectedRoute>
        <Route path="/partnere">
            <h1>Samarbeidspartnere</h1>
        </Route>
        <Route path="/stasjoner">
            <Stations />
        </Route>
        <Route path="/minside">
            <UserProfile />
        </Route>
        <Route path="/">
            <HomePage />
        </Route>
        <Redirect to="/" />
    </Switch>
);
