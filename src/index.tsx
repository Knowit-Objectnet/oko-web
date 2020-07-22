import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { injectFont } from './font-injection';

ReactDOM.render(<App />, document.getElementById('root'), injectFont);
