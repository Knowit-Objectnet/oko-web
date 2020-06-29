import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

interface AuthenticatedRouteProps extends RouteProps {
    authenticatedRoles?: Array<string>;
    is: React.ReactNode;
    not: React.ReactNode;
}

// Route only accessible for authenticated user
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props) => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    const { authenticatedRoles, is, not, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(props) => {
                return keycloak.authenticated &&
                    authenticatedRoles?.reduce((acc, cur) => keycloak.hasRealmRole(cur) || acc)
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
