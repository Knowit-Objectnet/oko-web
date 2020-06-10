import React from 'react';
import { RouterComponent } from './router/router';
import { GlobalStyle } from './global-styles';

export const App: React.FC = () => {
    return (
        <>
            <RouterComponent />
            <GlobalStyle />
        </>
    );
};

export default App;
