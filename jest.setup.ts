// Mock of authentication hook. For tests that renders components that calls the `useAuth` hook,
// it is also necessary to instantiate the hook with the `setupUseAuthMock()` method.
jest.mock('./src/auth/useAuth');

// Keycloak mock for testing of KeycloakProvider
jest.mock('./src/auth/keycloak', () => ({
    __esModule: true,
    default: {
        constructor: jest.fn(),
        init: jest.fn(() => {
            // KeycloakProvider expects a Promise returned, so we pass one that's always resolving
            return Promise.resolve();
        }),
        login: jest.fn(),
        createLoginUrl: jest.fn(),
        logout: jest.fn(),
        createLogoutUrl: jest.fn(),
        register: jest.fn(),
        createRegisterUrl: jest.fn(),
        createAccountUrl: jest.fn(),
        accountManagement: jest.fn(),
        hasRealmRole: jest.fn(),
        hasResourceRole: jest.fn(),
        loadUserProfile: jest.fn(),
        loadUserInfo: jest.fn(),
        isTokenExpired: jest.fn(),
        updateToken: jest.fn(),
        clearToken: jest.fn(),
        authenticated: true,
        tokenParsed: {},
    },
}));
