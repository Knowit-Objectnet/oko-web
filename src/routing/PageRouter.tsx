import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../types';
import { Notifications } from '../pages/notifications/Notifications';
import { Calendar } from '../pages/calendar/Calendar';
import { WeightReporting } from '../pages/weightReporting/WeightReporting';
import { Stations } from '../pages/stations/Stations';
import { Partners } from '../pages/partners/Partners';
import { useAuth } from '../auth/useAuth';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    return user.isAdmin ? <Redirect to="/oversikt" /> : <Redirect to="/kalender" />;
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
        <ProtectedRoute path="/stasjoner" requiredRoles={[Roles.Oslo]}>
            <Stations />
        </ProtectedRoute>
        <ProtectedRoute path="/partnere" requiredRoles={[Roles.Oslo]}>
            <Partners />
        </ProtectedRoute>
        <Route path="/">
            <HomePage />
        </Route>
        <Redirect to="/" />
    </Switch>
);
