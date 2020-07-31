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

### Authentication & RBAC
* keycloak-js
* @react-keycloak/web

### Data fetching and caching
* swr

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

#### Documentations
To start the development server simply execute ```yarn docz dev```