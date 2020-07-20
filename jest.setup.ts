import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/* For some god forsaken reason this needs to be imported to replace the global promise
 * as multiple different libraries using their own version of promise makes everything
 * boil, explode, make my will to live disappear, and make the keycloak mock not work
 */
global.Promise = jest.requireActual('promise');

// Keycloak mock to intercept function calls
jest.mock('./src/keycloak', () => ({
    __esModule: true,
    default: {
        constructor: jest.fn(),
        init: jest.fn(),
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

const originalError = console.error;

beforeAll(() => {
    console.error = (...args: any[]) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return;
        } else if (/Warning: You called act/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});
