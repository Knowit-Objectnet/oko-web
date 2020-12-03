import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    realm: 'production',
    url: 'https://keycloak.production.oko.knowit.no:8443/auth/',
    sslRequired: 'external',
    resource: 'react-app',
    clientId: 'react-app',
    publicClient: true,
    confidentialPort: 0,
});

export default keycloak;
