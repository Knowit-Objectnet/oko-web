import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Roles } from '../types';
import { useAuth } from '../auth/useAuth';

interface Props extends RouteProps {
    requiredRoles: Array<Roles>;
    fallbackRedirect?: string;
}

export const ProtectedRoute: React.FC<Props> = ({ requiredRoles, fallbackRedirect, children, ...rest }) => {
    const { user } = useAuth();
    const userIsAuthorized = requiredRoles.some((role) => user.hasRole(role));

    return userIsAuthorized ? <Route {...rest}>{children}</Route> : <Redirect to={fallbackRedirect ?? '/'} />;
};
