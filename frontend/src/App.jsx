import React from 'react';

import { GlobalStyle } from './global-styles';
import { Router } from './router/router';

function App() {
  return (
    <>
      <Router />
      <GlobalStyle />
    </>
  );
}

export default App;
