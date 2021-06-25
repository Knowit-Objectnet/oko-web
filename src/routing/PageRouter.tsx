import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../auth/Roles';
import { Loading } from '../components/Loading';

const Kalender = React.lazy(() => import('../pages/kalender'));
const Avtaler = React.lazy(() => import('../pages/avtaler'));
const Stasjoner = React.lazy(() => import('../pages/stasjoner'));
const MineAvtaler = React.lazy(() => import('../pages/minavtale'));

const Home: React.FC = () => {
    // const { user } = useAuth();
    return /*user.isAdmin ? <Redirect to="/oversikt" /> :*/ <Redirect to="/kalender" />;
};

export const PageRouter: React.FC = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            <Route path="/kalender/:view?">
                <Kalender />
            </Route>
            <ProtectedRoute path="/avtaler" requiredRoles={[Roles.Admin]}>
                <Avtaler />
            </ProtectedRoute>
            <ProtectedRoute path="/stasjoner" requiredRoles={[Roles.Admin]}>
                <Stasjoner />
            </ProtectedRoute>
            <ProtectedRoute path="/minavtale" requiredRoles={[Roles.Partner]}>
                <MineAvtaler />
            </ProtectedRoute>
            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Suspense>
);
