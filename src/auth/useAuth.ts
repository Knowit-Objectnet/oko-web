import { useKeycloak } from '@react-keycloak/web';
import { Roles } from '../types';
import { KeycloakTokenParsed } from 'keycloak-js';

interface UserProfile {
    // username?: string;
    // firstname?: string;
    // lastname?: string;
    // email?: string;
    aktorId?: number;
    // isAuthenticated?: boolean;
    isAdmin: boolean;
    isStasjon: boolean;
    isPartner: boolean;
    hasRole: (role: Roles) => boolean;
    ownsResource: (ownerId: number) => boolean;
}

interface AuthContext {
    authToken?: string;
    user: UserProfile;
    logout: (options: LogoutOptions) => void;
}

interface LogoutOptions {
    returnUrl: string;
}

// TODO: remove export when migration to useAuth is complete
export interface AuthTokenParsed extends KeycloakTokenParsed {
    GroupID?: number;
}

export const useAuth = (): AuthContext => {
    const { keycloak } = useKeycloak();
    const tokenParsed = keycloak.tokenParsed as AuthTokenParsed | undefined;

    const user: UserProfile = {
        // username: keycloak.profile?.username,
        // firstname: keycloak.profile?.firstName,
        // lastname: keycloak.profile?.lastName,
        // email: keycloak.profile?.email,
        aktorId: tokenParsed?.GroupID,
        // isAuthenticated: keycloak.authenticated,
        isAdmin: keycloak.hasRealmRole(Roles.Oslo),
        isStasjon: keycloak.hasRealmRole(Roles.Ambassador),
        isPartner: keycloak.hasRealmRole(Roles.Partner),
        ownsResource: (ownerId) => ownerId === tokenParsed?.GroupID,
        hasRole: (role) => keycloak.hasRealmRole(role),
    };

    const logout = (options: LogoutOptions) => {
        keycloak.logout({ redirectUri: options.returnUrl });
    };

    return {
        authToken: keycloak.token,
        user,
        logout,
    };
};
