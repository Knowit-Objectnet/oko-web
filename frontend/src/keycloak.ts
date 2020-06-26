import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: 'http://ombruk-ecs-public-staging-85208200.eu-central-1.elb.amazonaws.com:8080/auth/',
    realm: 'staging',
    clientId: 'react-app',
});

export default keycloak;
