# Oslo kommune ombruk frontend

[![](https://img.shields.io/badge/TypeScript-a?style=flat&logo=typescript&label=Code&color=3178C6&logoColor=ffffff)](https://www.typescriptlang.org/)
[![](https://img.shields.io/badge/React-a?style=flat&logo=react&label=Framework&color=61DAFB&logoColor=ffffff)](https://reactjs.org/)
[![](https://img.shields.io/badge/Webpack-a?style=flat&logo=webpack&label=Build%20tool&color=8DD6F9&logoColor=ffffff)](https://webpack.js.org/)  
[![](https://img.shields.io/badge/React%20Router-a?style=flat&logo=reactrouter&label=Library&color=CA4245&logoColor=ffffff)](https://reactrouter.com/)
[![](https://img.shields.io/badge/Chakra%20UI-a?style=flat&logo=chakraui&label=Library&color=319795&logoColor=ffffff)](https://chakra-ui.com/)  
[![](https://img.shields.io/badge/ESLint-a?style=flat&logo=eslint&label=Lint&color=4B32C3&logoColor=ffffff)](https://eslint.org/)
[![](https://img.shields.io/badge/Prettier-a?style=flat&logo=prettier&label=Formatter&color=F7B93E&logoColor=ffffff)](https://prettier.io/)  
[![](https://img.shields.io/badge/Node.js-a?style=flat&logo=nodedotjs&label=JS%20Runtime&color=339933&logoColor=ffffff)](https://nodejs.org/)
[![](https://img.shields.io/badge/Yarn-a?style=flat&logo=yarn&label=Package%20manager&color=2C8EBB&logoColor=ffffff)](https://classic.yarnpkg.com/en/)

## Table of Contents

-   [Intro](#intro)
-   [Built with](#built-with)
    -   [Libraries](#libraries)
-   [Getting started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Download project](#download-project)
    -   [Running locally](#running-locally)
-   [Build and deployment](#build-and-deployment)
    -   [Building and environment variables](#building-and-environment-variables)
-   [Technology and How to code](#technology-and-how-to-code)
    -   [General](#general)
    -   [Routing](#routing)
    -   [Authentication & Role Based Access Control](#authentication--role-based-access-control)
    -   [Data fetching and caching](#data-fetching-and-caching)
    -   [User interface](#user-interface)
    -   [Forms](#forms)
    -   [Utilities](#utilities)
    -   [Quality assurance](#quality-assurance)
        -   [Testing](#testing)
        -   [Linting / code formatting](#linting--code-formatting)
        -   [Git hooks](#git-hooks)
-   [File structure](#file-structure)
    -   [Mocks](#mocks)
    -   [Public](#public)
    -   [Src](#src)

## Intro

This is the frontend solution of the reuse station project,
belonging to [Renovasjon og Gjenvinningsetaten (_REG_)](https://www.oslo.kommune.no/etater-foretak-og-ombud/renovasjons-og-gjenvinningsetaten/) in Oslo Kommune.

It is a single page application written in [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/) and built with [Webpack](https://webpack.js.org/).

## Built with

As mentioned, the application is written in [Typescript](https://www.typescriptlang.org/) with [React](https://reactjs.org/) as its framework and [Webpack](https://webpack.js.org/) as its build tool. We would recommend reading up on the documentation for both [Typescript](https://www.typescriptlang.org/docs/) and [React](https://reactjs.org/docs/getting-started.html).

In the next section you will see a list with some of the libraries that you may need to read documentation on to understand some of the code base. The rest of the _dependencies_ can be seen in the `package.json` file in the root folder.

### Libraries:

-   [Chakra UI](https://chakra-ui.com/)
-   [React Router](https://reactrouter.com/)
-   [Axios](https://axios-http.com/)
-   [React Query](https://react-query.tanstack.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Yup](https://github.com/jquense/yup)
-   [date-fns](https://date-fns.org/)
-   [React Big Calendar](http://jquense.github.io/react-big-calendar/examples/index.html)
-   [React Day Picker](https://react-day-picker.js.org/)

**A deeper explanation on the technology used can be seen in the [Technology](#technology-and-how-to-code) section.**

## Getting started

### Prerequisites

To compile and run this project, you would need:

-   [Node, LTS version](https://nodejs.org/en/) (currently v14.16.1)
-   [Yarn, classic version](https://classic.yarnpkg.com/en/) (v1.22.5 or greater)

### Download project

This section will guide you to clone this repository. To follow this part of the guide,
we expect you to have [Git](https://git-scm.com/) installed. Type the following lines in the _Terminal_ (for **_unix_** users),
or _Command Prompt_ (for **_windows_** users):

```sh
cd /to-your-desired-directory
git clone https://kode.knowit.no/scm/oko/web.git
cd web
```

You are now inside the project folder.
Type `ls` in the _terminal_, or `dir` in _Command Prompt_ to see the root folder structure.

### Running locally

Before running/building locally the first time, copy the file `.env-sample` and rename to `.env`. The file provides the environment variables required. See ["Building and environment variables"](#building-and-environment-variables) below.

-   To start the development server simply execute the following in a _terminal_:
    ```sh
    yarn start
    ```
-   **Not recommended:** it is also possible to use the provided docker container by going into the folder `container` and executing `docker-compose up`.

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

-   [`test`](https://test.oko.knowit.no) – for development testing purposes. **Pull requests from development branches shall always be made to the `test` branch.**
-   [`staging`](https://staging.oko.knowit.no) – for pre-production testing purposes. Only pull requests from the `test` branch or `hotfix` branches shall be made to this branch.
-   [`production`](https://oko.knowit.no) – running application. Only pull requests from `staging` shall be made to this branch.

### Building and environment variables

The building process is dependent on a set of environment variables (e.g. the correct REST API URL).
Webpack is configured with the [`dotenv-webpack`](https://www.npmjs.com/package/dotenv-webpack) plugin, and the process works as follows:

1. Variables defined in an optional `.env` file in the root project folder is loaded into the global `process.env` object.
   Using `.env` files are intended for running and building locally.
2. Environment variables from the executing system/CLI session is loaded into the same global object. Matching
   names with variables from the `.env`-file is overwritten. Using system environment variables is intended for CI/CD
   tools (Bamboo).
3. References to `process.env.{ENV_VAR_NAME}` in the source code is substituted with the environment variable values at build time.

## Technology and How to code

### General

-   [React](https://reactjs.org/) / react-dom – only using functional components and [hooks](https://reactjs.org/docs/hooks-intro.html)
-   [Typescript](https://www.typescriptlang.org/)

### Routing

-   [react-router-dom](https://reactrouter.com/web)

### Authentication & Role Based Access Control

[Keycloak](https://www.keycloak.org/) is used for authenticating users, and managing user roles.

-   **[`keycloak-js`](https://www.npmjs.com/package/keycloak-js)**: client-side adapter for communicating with the Keycloak server.
    [Documentation can be found here.](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
    > **Note:** The version of the `keycloak-js` library is tightly coupled to the version of Keycloak that is running server-side.
    > This means that [this library must be updated (only) if the Keycloak server software is updated](https://www.keycloak.org/docs/latest/upgrading/#upgrading-keycloak-adapters).
-   **[`@react-keycloak/web`](https://www.npmjs.com/package/@react-keycloak/web)**: Provides a `KeycloakProvider` component
    that wraps the entire React application (see `App.tsx`). The component holds an instance of a `Keycloak`
    object (from `keaycloak-js`), and provides a `useKeycloak()` hook that can be used to check for authentication and
    roles in lower level components. See [package documentation for details](https://www.npmjs.com/package/@react-keycloak/web).

### Data fetching and caching

-   **[Axios](https://www.npmjs.com/package/axios)**: HTTP client library for doing REST API calls.
-   **[React Query](https://www.npmjs.com/package/react-query)**: library used for caching data fetched from REST API.
    Provides a `useQuery()` hook for the fetching and caching, and a `useMutation()` hook to update the data.
    The cache (contained in a `QueryClient` instance) has utility methods (like `invalidateQueries()`) that can be used for interacting with the cache.
    [Documentation can be found here.](https://react-query.tanstack.com/docs)

### User interface

[Chakra UI](https://chakra-ui.com/) is chosen as the underlying UI component library, which is based on the following benefits:

-   Provides common components with base functionality (layout/container elements, form elements, modals, alerts, etc.)
-   Components are easily customizable and styleable (using ["style props"](https://chakra-ui.com/docs/features/style-props) and theming)
-   Simple system for creating [responsive styles](https://chakra-ui.com/docs/features/responsive-styles)
-   Handles accessibility (for most components - check for "Accessibility" in doc for each component)
-   Theming system
-   Global CSS reset
-   Well documented

**Recommended reading:**

-   [Design principles](https://chakra-ui.com/docs/principles)
-   [Style Props](https://chakra-ui.com/docs/features/style-props)
-   [Responsive styles](https://chakra-ui.com/docs/features/responsive-styles)
-   [Theming](https://chakra-ui.com/docs/theming/theme)
    -   [Customizing theme](https://chakra-ui.com/docs/theming/customize-theme)
    -   [Styling components](https://chakra-ui.com/docs/theming/component-style)
    -   [Text and Layer styles](https://chakra-ui.com/docs/features/text-and-layer-styles)
    -   [Global styles](https://chakra-ui.com/docs/features/global-styles)
-   [The `sx` Prop](https://chakra-ui.com/docs/features/the-sx-prop)
-   The full list of available components can be found [in the documentation](https://chakra-ui.com/docs)

**Guidelines:**

-   We're using fully qualified CSS property names, not the abbreviations (e.g. `backgroundColor`, not `bgColor`)
-   To customize the styling of predefined library components, we're using [the theme system](https://chakra-ui.com/docs/theming/component-style)
    (if possible). Theme files are located in the `theme` folder.

#### Forms

-   [React Hook Form](https://react-hook-form.com/) for keeping track of form state.
-   [yup](https://github.com/jquense/yup) for performing validation of user input.

### Utilities

-   [date-fns](https://date-fns.org/)
-   [lodash](https://lodash.com/)

### Quality Assurance

#### Testing

-   [Jest](https://jestjs.io/): testing framework
-   `ts-jest`: [transforms `.ts` and `.tsx` test files to CommonJS](https://kulshekhar.github.io/ts-jest/docs/getting-started/presets#the-presets) so that Jest can run them. Also provides a [`mocked()` test helper function](https://kulshekhar.github.io/ts-jest/docs/guides/test-helpers#mockedtitem-t-deep--false) for fixing typing issues with mocks.
-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [jest-dom](https://github.com/testing-library/jest-dom)

#### Linting / code formatting

-   [Eslint](https://eslint.org/), with plugins for the following (see `.eslintrc.json` for details):
    -   [TypeScript](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)
    -   [React](https://www.npmjs.com/package/eslint-plugin-react) and [React Hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
    -   [JSX a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
    -   [Testing library](https://testing-library.com/docs/ecosystem-eslint-plugin-testing-library/) and [jest-dom](https://testing-library.com/docs/ecosystem-eslint-plugin-jest-dom/)
-   [Prettier](https://prettier.io/)
-   [lint-staged](https://www.npmjs.com/package/lint-staged) (used by Husky as pre-commit git hook)

#### Git hooks

-   [Husky](https://www.npmjs.com/package/husky)
    -   pre-commit: lint-staged
    -   pre-push: linting and testing

## File structure

### Mocks

\_\_mocks\_\_ are mocks for testing and the tests are createt by [Jest](https://jestjs.io/) with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) and [Enzyme](https://enzymejs.github.io/enzyme/).

### Public

public consists of all the static files, like `index.html`.

### Src

Inside _src_ are all the source kode for the application, and they are organized in folders and files.

-   `index` and `app` are the root of the application, like in most React projects.
-   `assets` is where all the images and fonts are stored.
-   `auth` is the folder that consist of all the files used for authentication and roles. `keycloak.ts` is the file that initialises keycloak.
-   `components`, as the name says, here are the components that are used multiple places.
-   `pages` is a folder that consists of multiple folders for each page in the application. They store their own components and forms if they are specialized for their page.
-   `routing` stores all the files for routing in the application.
-   `services` this is where the queries are done to the database.
-   `theme`, to follow some of the color scheme for this project.
-   `utils` useful function multiple places in the application.
