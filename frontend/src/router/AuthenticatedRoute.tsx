import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

interface AuthenticatedRouteProps {
    path: string;
    is: React.ReactNode;
    not: React.ReactNode;
}

// Route only accessible for authenticated user
export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props) => {
    // Getting Keycloak instance
    const { keycloak } = useKeycloak();

    const {path, is, not} = props;

    return (
        <>
        {
            keycloak.authenticated
            ? (
                    <Route path={path} render={(props)  => {
                        return (is instanceof Function ? is() : is)
                    }}/>
                )
            : (
                    <Route path={path} render={(props)  => {
                        return (not instanceof Function ? not() : not)
                    }} />
                )
        }
        </>
    )
};