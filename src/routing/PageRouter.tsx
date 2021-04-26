import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Notifications } from '../pages/notifications/Notifications';
import { Calendar } from '../pages/calendar/Calendar';
import { WeightReporting } from '../pages/weightReporting/WeightReporting';
import { Stations } from '../pages/stations/Stations';
import { Partners } from '../pages/partners/Partners';
import { useAuth } from '../auth/useAuth';
import { Roles } from '../auth/Roles';
import { Kalender } from '../pages/kalender/Kalender';

const HomePage: React.FC = () => {
    const { user } = useAuth();
    return user.isAdmin ? <Redirect to="/oversikt" /> : <Redirect to="/kalender" />;
};

export const PageRouter: React.FC = () => (
    <Switch>
        <Route path="/kalender">
            <Kalender />
        </Route>
        <Route path="/calendar">
            <Calendar />
        </Route>
        <ProtectedRoute path="/oversikt" requiredRoles={[Roles.Admin]}>
            <Notifications />
        </ProtectedRoute>
        <ProtectedRoute path="/varsler" requiredRoles={[Roles.Partner, Roles.Stasjon]}>
            <Notifications />
        </ProtectedRoute>
        <ProtectedRoute path="/vektuttak" requiredRoles={[Roles.Partner]}>
            <WeightReporting />
        </ProtectedRoute>
        <ProtectedRoute path="/stasjoner" requiredRoles={[Roles.Admin]}>
            <Stations />
        </ProtectedRoute>
        <ProtectedRoute path="/partnere" requiredRoles={[Roles.Admin]}>
            <Partners />
        </ProtectedRoute>
        <Route path="/">
            <HomePage />
        </Route>
        <Redirect to="/" />
    </Switch>
);
