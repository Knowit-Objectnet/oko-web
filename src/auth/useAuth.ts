import { KeycloakTokenParsed } from 'keycloak-js';
import { useKeycloak } from '@react-keycloak/web';
import { Roles } from './Roles';

interface UserProfile {
    // username?: string;
    // firstname?: string;
    // lastname?: string;
    // email?: string;
    aktorId: number;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isStasjon: boolean;
    isPartner: boolean;
    hasRole: (role: Roles) => boolean;
    ownsResource: (ownerId: number) => boolean;
}

interface LogoutOptions {
    returnUrl: string;
}

interface AuthContext {
    user: UserProfile;
    logout: (options: LogoutOptions) => void;
}

interface AuthTokenParsed extends KeycloakTokenParsed {
    GroupID: number;
}

export const useAuth = (): AuthContext => {
    const { keycloak } = useKeycloak();

    // TODO: remove type assertion and fix issues with the fact that
    //  the token and its parsed properties will be undefined if Keycloak isn't ready yet?
    const tokenParsed = keycloak.tokenParsed as AuthTokenParsed;

    const user: UserProfile = {
        // username: keycloak.profile?.username,
        // firstname: keycloak.profile?.firstName,
        // lastname: keycloak.profile?.lastName,
        // email: keycloak.profile?.email,
        aktorId: tokenParsed.GroupID,
        isAuthenticated: keycloak.authenticated ?? false,
        isAdmin: keycloak.hasRealmRole(Roles.Admin),
        isStasjon: keycloak.hasRealmRole(Roles.Stasjon),
        isPartner: keycloak.hasRealmRole(Roles.Partner),
        hasRole: (role) => keycloak.hasRealmRole(role),
        ownsResource: (ownerId) => ownerId === tokenParsed?.GroupID,
    };

    const logout = (options: LogoutOptions) => {
        keycloak.logout({ redirectUri: options.returnUrl });
    };

    return {
        user,
        logout,
    };
};
