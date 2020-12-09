import Keycloak from 'keycloak-js';

// Setup Keycloak instance
const keycloak = new Keycloak({
    realm: process.env.REACT_APP_KEYCLOAK_REALM,
    url: process.env.REACT_APP_KEYCLOAK_URL,
    sslRequired: 'external',
    resource: 'react-app',
    clientId: 'react-app',
    publicClient: true,
    confidentialPort: 0,
});

export default keycloak;
