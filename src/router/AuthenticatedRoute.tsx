import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { Roles } from '../types';

interface AuthenticatedRouteProps extends RouteProps {
    authenticatedRoles?: Array<Roles>;
    is: React.ReactNode;
    not: React.ReactNode;
}

// Route only accessible for authenticated user
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props) => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    const { authenticatedRoles, is, not, ...rest } = props;
    const roleAccess = authenticatedRoles
        ? authenticatedRoles?.reduce((acc, cur) => keycloak.hasRealmRole(cur) || acc, false)
        : true;
    return (
        <Route
            {...rest}
            render={(props) => {
                return keycloak.authenticated && roleAccess
                    ? is instanceof Function
                        ? is()
                        : is
                    : not instanceof Function
                    ? not()
                    : not;
            }}
        />
    );
};
