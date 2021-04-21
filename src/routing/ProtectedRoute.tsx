import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Roles } from '../types';

interface Props extends RouteProps {
    requiredRoles: Array<Roles>;
    fallbackRedirect?: string;
}

export const ProtectedRoute: React.FC<Props> = ({ requiredRoles, fallbackRedirect, children, ...rest }) => {
    const { keycloak } = useKeycloak();
    const userIsAuthorized = requiredRoles.some((role) => keycloak.hasRealmRole(role));

    return userIsAuthorized ? <Route {...rest}>{children}</Route> : <Redirect to={fallbackRedirect ?? '/'} />;
};
