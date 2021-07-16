import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../auth/Roles';
import { Loading } from '../components/Loading';
import Kategorier from '../pages/kategorier';
import Innstillinger from '../pages/innstillinger';
import Vekt from '../pages/vekt';

const Kalender = React.lazy(() => import('../pages/kalender'));
const Henting = React.lazy(() => import('../pages/henting'));
const Registrering = React.lazy(() => import('../pages/vekt/registrering'));
const Avtaler = React.lazy(() => import('../pages/avtaler'));
const Stasjoner = React.lazy(() => import('../pages/stasjoner'));
const MineAvtaler = React.lazy(() => import('../pages/minavtale'));
const EkstraUttak = React.lazy(() => import('../pages/ekstrauttak'));
const Aarsaker = React.lazy(() => import('../pages/avlysningsaarsaker'));

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
            <Route path="/vekt/:hentingId">
                <Registrering />
            </Route>
            <ProtectedRoute path="/avtaler" requiredRoles={[Roles.Admin, Roles.Stasjon]}>
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
            <ProtectedRoute path="/aarsaker" requiredRoles={[Roles.Admin]}>
                <Aarsaker />
            </ProtectedRoute>
            <ProtectedRoute path="/innstillinger" requiredRoles={[Roles.Admin]}>
                <Innstillinger />
            </ProtectedRoute>
            <ProtectedRoute path="/ekstrauttak" requiredRoles={[Roles.Stasjon, Roles.Admin, Roles.Partner]}>
                <EkstraUttak />
            </ProtectedRoute>
            <ProtectedRoute path="/vekt" requiredRoles={[Roles.Stasjon, Roles.Admin, Roles.Partner]}>
                <Vekt />
            </ProtectedRoute>
            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Suspense>
);
