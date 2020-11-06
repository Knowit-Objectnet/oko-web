import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { injectFont } from './font-injection';

const runAfterFirstRender = () => {
    // Inject the Oslo font into the css
    injectFont();
};

ReactDOM.render(<App />, document.getElementById('root'), runAfterFirstRender);
