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
  that wraps the entire React application (see `App.tsx`). The component holds an instance of a `Keycloak`
  object (from `keaycloak-js`), and provides a `useKeycloak()` hook that can be used to check for authentication and 
  roles in lower level components. See [package documentation for details](https://www.npmjs.com/package/@react-keycloak/web).

### Data fetching and caching

> The project is in the process of being migrated from `Fetch` + `SWR` to `Axios` + `React Query`.
> <br/>Current status for resource entities:
> 
> | `Fetch` + `SWR`| `Axios` + `React Query` |
> | --- | --- |
> |`Request`, `Report`|`Event`, `Station`, `Partner`, `PickUp`|

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

### Local development

Before running/building locally the first time, copy the file `.env-sample` and rename to `.env`. The file provides the 
environment variables required. See [Building and environment variables](#building-and-environment-variables).

* To start the development server simply execute `npm start`. 
* Alternatively, start the provided docker container by going into the folder `container` and executing `docker-compose up`.

> **Note:** There might be an issue when running the app locally (in the 0.0.0.0 or localhost domain), 
> and connecting to an external Keycloak server. A logged in user might wrongfully be redirected to a logged out page 
> after a certain amount of time. This happens because the web browser identifies the cookie set by Keycloak as 
> from a third party. The problem is solved by disabling the blocking of third-party cookies 
> in the browser. If possible, this should preferably be done by adding a specific rule to allow all cookies from 
> the domain of the Keycloak URL ([instructions for Google Chrome](https://support.google.com/chrome/answer/95647)).

### Build and deployment

The source code is built and deployed to AWS S3 with CI/CD, configured in Bamboo 
([byggmester.knowit.no](https://byggmester.knowit.no/browse/OKO-WB)).

Three environments are configured in AWS. Each environment is linked to a corresponding branch in the Bitbucket repository.
The building process in Bamboo is automatically triggered by creating a pull request to one of these branches. When a pull
request is merged, the project is automatically rebuilt and deployed to the correct environment. An exception here is
that deployment to the `production` environment must be triggered manually.

The environments/branches:

* `test` – for development testing purposes. **Pull requests from development branches shall always be made to the `test` branch.**
* `staging` – for pre-production testing purposes. Only pull requests from `test` shall be made to this branch.
* `production` – running application. Only pull requests from `staging` shall be made to this branch.

#### Building and environment variables

The building process is dependent on a set of environment variables (e.g. the correct REST API URL). 
Webpack is configured with the [`dotenv-webpack`](https://www.npmjs.com/package/dotenv-webpack) plugin, and the process works as follows:

1. Variables defined in an optional `.env` file in the root project folder is loaded into the global `process.env` object.
   Using `.env` files are intended for running and building locally.
2. Environment variables from the executing system/CLI session is loaded into the same global object. Matching
   names with variables from the `.env`-file is overwritten. Using system environment variables is intended for CI/CD
   tools (Bamboo).
3. References to `process.env.{ENV_VAR_NAME}` in the source code is substituted with the environment variable values at build time.

## Documentation

### Local development
To start the development server simply execute ```yarn docz dev```

### For deployment
Follow docz documentation to get the documentation website up for production: [https://www.docz.site/docs/deploying-your-docs](https://www.docz.site/docs/deploying-your-docs)