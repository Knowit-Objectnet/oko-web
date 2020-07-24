import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { injectFont } from './font-injection';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { preFetch } from './pre-fetch';

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

// Functions to call when the initial render is done
const callback = () => {
    // Inject the Oslo font into the css
    injectFont();
    // Pre-fetch data without a token
    preFetch();
};

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>,
    document.getElementById('root'),
    callback,
);
