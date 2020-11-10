# Oslo kommune ombruk

The frontend-web for Oslo REG knowit 2020 summer project.

## Tech

### General
* Typescript
* react
* react-dom

### Routing
* react-router-dom
* history

### Authentication & Role Based Access Control

[Keycloak](https://www.keycloak.org/) is used for authenticating users, and managing user roles.

* **[keycloak-js](https://www.npmjs.com/package/keycloak-js)**: client-side adapter for communicating with the Keycloak server. 
[Documentation can be found here.](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
* **[@react-keycloak/web](https://www.npmjs.com/package/@react-keycloak/web)**: Provides a `KeycloakProvider` component 
that wraps the entire React application (see `App.tsx`). The component holds an instance of a `Keycloak` object (from `keaycloak-js`), and provides a `useKeycloak()` hook that 
can be used to check for authentication and roles in lower level components. See [package documentation for details](https://www.npmjs.com/package/@react-keycloak/web).

### Data fetching and caching

> The project is in the process of being migrated from `Fetch` + `SWR` to `Axios` + `React Query`.
> <br/>Current status for resource entities:
> 
> | `Fetch` + `SWR`| `Axios` + `React Query` |
> | --- | --- |
> |`PickUp`, `Request`, `Report`|`Event`, `Station`, `Partner`|

* **[Axios](https://www.npmjs.com/package/axios)**: HTTP client library for doing REST API calls.
* **[React Query](https://www.npmjs.com/package/react-query)**: library used for caching data fetched from REST API.
Provides a `useQuery()` hook for the fetching and caching, and a `useMutation()` hook to update the data. 
The cache (a `QueryCache` instance) has utility methods (like `invalidateQueries()`) that can be used for interacting with the cache. 
[Documentation can be found here.](https://react-query.tanstack.com/docs)

**⚠ Will be replaced:**

* **[swr](https://swr.vercel.app/)**: caching library
---

### Alert system
* react-alert
* react-alert-template-basic

### Calendar & Date-picking & Time-picking
* @wojtekmaj/react-daterange-picker
* @wojtekmaj/react-timerange-picker
* react-calendar
* react-date-picker

### Date manipulation
* date-fns

### CSS
* react-transition-group
* styled-components

### Other

#### Testing
* Jest
  * React-testing-library
  * Axios Mock Adapter
  * Enzyme
* Cypress

#### Linting
* Eslint
  * react/recommended
  * @typescript-eslint/recommended
  * @typescript-eslint
  * prettier/recommended
  * mdx/recommended

#### Miscellaneous
* Documentation: **Docz**
* Git Hooks: **Husky**

## Getting it up
### Production
#### App
To get the app ready for production simply execute ```npm run-script build``` and then host the static files from the 'public' folder.

#### Documentation
Follow docz documentation to get the documentation website up for production: [https://www.docz.site/docs/deploying-your-docs](https://www.docz.site/docs/deploying-your-docs)

### Development
#### App
To start the development server simply execute ```npm run-script start``` or start the docker container by going into the folder 'container' and executing ```docker-compose up```

> **Note:** There might be an issue when running the app locally (in the 0.0.0.0 or localhost domain), and connecting to an external Keycloak server. A logged in user might wrongfully be redirected to a logged out page after a certain amount of time. The problem can be solved by disabling the blocking of third-party cookies in the browser. This should preferably be done by adding a specific rule to allow all cookies from the domain of the Keycloak server ([instructions for Google Chrome](https://support.google.com/chrome/answer/95647)).   

#### Documentation
To start the development server simply execute ```yarn docz dev```