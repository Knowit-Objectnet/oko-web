import { useKeycloak } from '@react-keycloak/web';
import { Roles } from './Roles';
import { useEffect, useState } from 'react';

export interface UserInfo {
    aktorId?: string;
    isAdmin: boolean;
    isStasjon: boolean;
    isPartner: boolean;
    hasRole: (role: Roles) => boolean;
    ownsResource: (ownerId: string) => boolean;
}

interface LogoutOptions {
    returnUrl: string;
}

export interface AuthContext {
    user: UserInfo;
    logout: (options: LogoutOptions) => void;
}

export const useAuth = (): AuthContext => {
    const { keycloak } = useKeycloak();

    const [keycloakGroupId, setKeycloakGroupId] = useState<string>();

    useEffect(() => {
        if (!keycloak.authenticated) {
            keycloak.login();
        }
        setKeycloakGroupId(keycloak?.tokenParsed?.GroupID);
    }, [keycloak]);

    const user: UserInfo = {
        aktorId: keycloakGroupId,
        isAdmin: keycloak.hasRealmRole(Roles.Admin),
        isStasjon: keycloak.hasRealmRole(Roles.Stasjon),
        isPartner: keycloak.hasRealmRole(Roles.Partner),
        hasRole: (role) => keycloak.hasRealmRole(role),
        ownsResource: (ownerId) => ownerId === keycloakGroupId,
    };

    const logout = (options: LogoutOptions) => {
        keycloak.logout({ redirectUri: options.returnUrl });
    };

    return {
        user,
        logout,
    };
};
