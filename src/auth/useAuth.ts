import { useKeycloak } from '@react-keycloak/web';

interface AuthContext {
    isLoading: boolean;
    user: {
        username: string;
        name: string;
        email: string;
        groupId: string;
        isAuthenticated: boolean;
    };
    logout: () => void;
    token: string;
}

export const useAuth = (): AuthContext => {
    const { keycloak } = useKeycloak();

    return {
        isLoading: !!keycloak.initialized,
        user: {
            username: keycloak.tokenParsed?.username,
            name: keycloak.tokenParsed?.name,
            email: keycloak.tokenParsed?.email,
            groupId: keycloak.tokenParsed?.GroupID,
            isAuthenticated: keycloak.authenticated,
        },
        logout: keycloak.logout(),
        token: keycloak.token,
    };
};
