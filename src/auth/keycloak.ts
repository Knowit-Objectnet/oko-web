import Keycloak from 'keycloak-js';

export default Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL,
    realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
    clientId: 'react-app',
});
