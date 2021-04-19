# Oslo kommune ombruk

The frontend-web for Oslo Kommune REG Knowit 2020 summer project.

The frontend is an SPA (single page application) written in React with TypeScript. The project uses webpack as build tool. 

## Local development

### Prerequisites

* [Node, LTS version](https://nodejs.org/en/) (currently v14.16.1)
* [Yarn, classic version](https://classic.yarnpkg.com/en/) (v1.22.5 or greater)

### Running locally

Before running/building locally the first time, copy the file `.env-sample` and rename to `.env`. The file provides the
environment variables required. See ["Building and environment variables"](#building-and-environment-variables) below.

* To start the development server simply execute `yarn start`.
* Alternatively, start the provided docker container by going into the folder `container` and executing `docker-compose up`.

> **Note:** There might be an issue when running the app locally (in the 0.0.0.0 or localhost domain),
> and connecting to an external Keycloak server. A logged in user might wrongfully be redirected to a logged out page
> after a certain amount of time. This happens because the web browser identifies the cookie set by Keycloak as
> from a third party. The problem is solved by disabling the blocking of third-party cookies
> in the browser. If possible, this should preferably be done by adding a specific rule to allow all cookies from
> the domain of the Keycloak URL ([instructions for Google Chrome](https://support.google.com/chrome/answer/95647)).

## Build and deployment

The source code is built and deployed to AWS S3 with CI/CD, configured in Bamboo
([byggmester.knowit.no](https://byggmester.knowit.no/browse/OKO-WB)).

Three environments are configured in AWS. Each environment is linked to a corresponding branch in the Bitbucket repository.
The building process in Bamboo is automatically triggered by creating a pull request to one of these branches. When a pull
request is merged, the project is automatically rebuilt and deployed to the correct environment. An exception here is
that deployment to the `production` environment must be triggered manually.

The environments/branches:

* [`test`](https://test.oko.knowit.no) – for development testing purposes. **Pull requests from development branches shall always be made to the `test` branch.**
* [`staging`](https://staging.oko.knowit.no) – for pre-production testing purposes. Only pull requests from `test` shall be made to this branch.
* [`production`](https://oko.knowit.no) – running application. Only pull requests from `staging` shall be made to this branch.

#### Building and environment variables

The building process is dependent on a set of environment variables (e.g. the correct REST API URL).
Webpack is configured with the [`dotenv-webpack`](https://www.npmjs.com/package/dotenv-webpack) plugin, and the process works as follows:

1. Variables defined in an optional `.env` file in the root project folder is loaded into the global `process.env` object.
   Using `.env` files are intended for running and building locally.
2. Environment variables from the executing system/CLI session is loaded into the same global object. Matching
   names with variables from the `.env`-file is overwritten. Using system environment variables is intended for CI/CD
   tools (Bamboo).
3. References to `process.env.{ENV_VAR_NAME}` in the source code is substituted with the environment variable values at build time.

## Tech

### General
* [React](https://reactjs.org/) / react-dom – only using functional components and [hooks](https://reactjs.org/docs/hooks-intro.html)
* [Typescript](https://www.typescriptlang.org/)
* [styled-components](https://styled-components.com/)

### Routing
* [react-router-dom](https://reactrouter.com/web)

### Authentication & Role Based Access Control

[Keycloak](https://www.keycloak.org/) is used for authenticating users, and managing user roles.

* **[`keycloak-js`](https://www.npmjs.com/package/keycloak-js)**: client-side adapter for communicating with the Keycloak server.
  [Documentation can be found here.](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
  > **Note:** The version of the `keycloak-js` library is tightly coupled to the version of Keycloak that is running server-side.
  > This means that [this library must be updated (only) if the Keycloak server software is updated](https://www.keycloak.org/docs/latest/upgrading/#upgrading-keycloak-adapters).
* **[`@react-keycloak/web`](https://www.npmjs.com/package/@react-keycloak/web)**: Provides a `KeycloakProvider` component 
  that wraps the entire React application (see `App.tsx`). The component holds an instance of a `Keycloak`
  object (from `keaycloak-js`), and provides a `useKeycloak()` hook that can be used to check for authentication and 
  roles in lower level components. See [package documentation for details](https://www.npmjs.com/package/@react-keycloak/web).

### Data fetching and caching

* **[Axios](https://www.npmjs.com/package/axios)**: HTTP client library for doing REST API calls.
* **[React Query](https://www.npmjs.com/package/react-query)**: library used for caching data fetched from REST API.
Provides a `useQuery()` hook for the fetching and caching, and a `useMutation()` hook to update the data. 
The cache (contained in a `QueryClient` instance) has utility methods (like `invalidateQueries()`) that can be used for interacting with the cache. 
[Documentation can be found here.](https://react-query.tanstack.com/docs)

### User interface
* [react-alert](https://www.npmjs.com/package/react-alert) and react-alert-template-basic for toast-style alerts
* [react-calendar](https://www.npmjs.com/package/react-calendar)
* [react-date-picker](https://projects.wojtekmaj.pl/react-date-picker/)
* [@wojtekmaj/react-daterange-picker](https://projects.wojtekmaj.pl/react-daterange-picker/)
* [@wojtekmaj/react-timerange-picker](https://projects.wojtekmaj.pl/react-timerange-picker/)
* [react-transition-group](https://reactcommunity.org/react-transition-group/)

#### Forms 

> The forms in the project is being migrated to the setup below. 

* [React Hook Form](https://react-hook-form.com/)
* [yup](https://github.com/jquense/yup)


### Utilities
* [date-fns](https://date-fns.org/)
* [lodash](https://lodash.com/)

### Quality Assurance

#### Testing
* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [jest-dom](https://github.com/testing-library/jest-dom)
* [Axios Mock Adapter](https://www.npmjs.com/package/axios-mock-adapter) ([should probably be replaced with Mock Service Worker](https://testing-library.com/docs/react-testing-library/example-intro/))

#### Linting / code formatting

* [Eslint](https://eslint.org/), with plugins for the following (see `.eslintrc.json` for details):
  * [TypeScript](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
  * [React](https://www.npmjs.com/package/eslint-plugin-react) and [React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  * [JSX a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
  * [Testing library](https://testing-library.com/docs/ecosystem-eslint-plugin-testing-library/) and [jest-dom](https://testing-library.com/docs/ecosystem-eslint-plugin-jest-dom/)
* [Prettier](https://prettier.io/)
* [lint-staged](https://www.npmjs.com/package/lint-staged) (used by Husky as pre-commit git hook)

#### Git hooks

* [Husky](https://www.npmjs.com/package/husky)
  * pre-commit: lint-staged
  * pre-push: linting and testing

## Documentation

An incomplete setup of a [Docz](https://www.docz.site) documentation has been (temporarily) archived in the `docs` folder. 
See Readme file in that folder for more information.