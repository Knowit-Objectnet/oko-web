import Keycloak from 'keycloak-js';

// Setup Keycloak instance
const keycloak = new Keycloak({
    realm: process.env.KEYCLOAK_REALM,
    url: process.env.KEYCLOAK_URL,
    sslRequired: 'external',
    resource: 'react-app',
    clientId: 'react-app',
    publicClient: true,
    confidentialPort: 0,
});

export default keycloak;
