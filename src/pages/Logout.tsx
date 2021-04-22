import * as React from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { Helmet } from 'react-helmet';
import { Loading } from '../components/Loading';
import { useEffect } from 'react';

export const Logout: React.FC = () => {
    const { keycloak } = useKeycloak();

    // The user will be redirected to this URL after logout is completed
    // We need to strip path from URL in order to prevent redirect back to logout in case of re-login
    const redirectUri = location.href.slice(0, location.href.indexOf(location.pathname));

    useEffect(
        () => {
            keycloak.logout({
                redirectUri,
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <>
            <Helmet>
                <title>Logger deg ut...</title>
            </Helmet>
            <Loading text="Logger ut..." />
        </>
    );
};
