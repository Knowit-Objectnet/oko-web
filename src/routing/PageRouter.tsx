import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Roles } from '../auth/Roles';
import { Loading } from '../components/Loading';
import { PartnerForm } from '../pages/avtaler/partner/PartnerForm';
import { FormRoute } from '../components/forms/FormRoute';
import { KontaktPersonForm } from '../components/kontaktperson/KontaktPersonForm';
import { VerifiseringPage } from '../components/kontaktperson/VerifiseringPage';

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
const Personvern = React.lazy(() => import('../pages/personvern'));

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
            <ProtectedRoute path="/vekt/rediger/:hentingId" requiredRoles={[Roles.Admin, Roles.Partner, Roles.Stasjon]}>
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
            <FormRoute path="/partnere/rediger" title="Rediger samarbeidspartner" requiredRoles={[Roles.Admin]}>
                <PartnerForm />
            </FormRoute>
            <FormRoute path="/partnere/ny" title="Legg til ny samarbeidspartner" requiredRoles={[Roles.Admin]}>
                <PartnerForm />
            </FormRoute>
            <FormRoute
                path="/partnere/kontakt/ny"
                title="Legg til ny kontaktperson"
                requiredRoles={[Roles.Admin, Roles.Partner]}
            >
                <KontaktPersonForm />
            </FormRoute>
            <FormRoute
                path="/partnere/kontakt/rediger"
                title="Rediger kontaktinformasjon"
                requiredRoles={[Roles.Admin, Roles.Partner]}
            >
                <KontaktPersonForm />
            </FormRoute>
            <FormRoute
                path="/partnere/kontakt/verifiser"
                title="Verifiser kontaktinformasjon"
                requiredRoles={[Roles.Admin, Roles.Partner]}
            >
                <VerifiseringPage />
            </FormRoute>
            <Route path="/ekstrahenting">
                <EkstraHenting />
            </Route>
            <Route path="/vekt">
                <Vekt />
            </Route>
            <Route path="/personvern">
                <Personvern />
            </Route>
            <Route path="/">
                <Home />
            </Route>
            <Redirect to="/" />
        </Switch>
    </Suspense>
);
