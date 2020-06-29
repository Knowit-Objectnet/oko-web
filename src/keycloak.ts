import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    realm: 'staging',
    url: 'https://keycloak.oko.knowit.no:8443/',
    sslRequired: 'external',
    resource: 'react-app',
    clientId: 'react-app',
    publicClient: true,
    confidentialPort: 0,
});

export default keycloak;
