import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from '../components/Loading';
import { useEffect } from 'react';
import { useAuth } from '../auth/useAuth';

export const Logout: React.FC = () => {
    const { logout } = useAuth();

    // The user will be redirected to this URL after logout is completed
    // We need to strip path from URL in order to prevent redirect back to logout in case of re-login
    const returnUrl = location.href.slice(0, location.href.indexOf(location.pathname));

    useEffect(() => {
        logout({
            returnUrl,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Helmet>
                <title>Logger deg ut...</title>
            </Helmet>
            <Loading label="Logger ut..." />
        </>
    );
};
