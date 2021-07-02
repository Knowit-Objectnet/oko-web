import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../auth/Roles';
import { Loading } from '../components/Loading';
import Kategorier from '../pages/kategorier';

const Kalender = React.lazy(() => import('../pages/kalender'));
const Henting = React.lazy(() => import('../pages/henting'));
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
            <Route path="/henting/:hentingId">
                <Henting />
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
            <ProtectedRoute path="/kategorier" requiredRoles={[Roles.Admin]}>
                <Kategorier />
            </ProtectedRoute>
            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Suspense>
);
