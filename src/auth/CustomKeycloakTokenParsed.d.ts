import 'keycloak-js';

// Extending the default TypeScript type for the Keycloak token.
//  This is needed in order for TypeScript to be aware of the custom attribute we have set in the token.
declare module 'keycloak-js' {
    export interface KeycloakTokenParsed {
        GroupID?: string;
    }
}
