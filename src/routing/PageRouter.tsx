import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../auth/Roles';
import { Loading } from '../components/Loading';

const Kalender = React.lazy(() => import('../pages/kalender'));
const Henting = React.lazy(() => import('../pages/henting'));
const VektRegistrering = React.lazy(() => import('../pages/vekt/registrering'));
const VektRedigering = React.lazy(() => import('../pages/vekt/redigering'));
const Avtaler = React.lazy(() => import('../pages/avtaler'));
const Stasjoner = React.lazy(() => import('../pages/stasjoner'));
const MineAvtaler = React.lazy(() => import('../pages/minavtale'));
const EkstraHenting = React.lazy(() => import('../pages/ekstrahenting'));
const Aarsaker = React.lazy(() => import('../pages/avlysningsaarsaker'));
const Innstillinger = React.lazy(() => import('../pages/innstillinger'));
const Kategorier = React.lazy(() => import('../pages/kategorier'));
const Vekt = React.lazy(() => import('../pages/vekt'));

const Home: React.FC = () => {
    // const { user } = useAuth();
    return /*user.isAdmin ? <Redirect to="/oversikt" /> :*/ <Redirect to="/kalender" />;
};

export const PageRouter: React.FC = () => (
    <Suspense fallback={<Loading isFullPage />}>
        <Switch>
            <Route path="/kalender/:view?">
                <Kalender />
            </Route>
            <Route path="/henting/:hentingId">
                <Henting />
            </Route>
            <Route path="/vekt/registrer/:hentingId">
                <VektRegistrering />
            </Route>
            <ProtectedRoute path="/vekt/rediger/:hentingId" requiredRoles={[Roles.Admin, Roles.Partner]}>
                <VektRedigering />
            </ProtectedRoute>
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
            <Route path="/ekstrahenting">
                <EkstraHenting />
            </Route>
            <Route path="/vekt">
                <Vekt />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Suspense>
);
