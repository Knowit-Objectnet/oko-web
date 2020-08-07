import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { injectFont } from './font-injection';
import { preFetch } from './pre-fetch';

// Functions to call when the initial render is done
const callback = () => {
    // Inject the Oslo font into the css
    injectFont();
    // Pre-fetch data without a token
    preFetch();
};

ReactDOM.render(<App />, document.getElementById('root'), callback);
