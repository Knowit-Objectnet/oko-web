import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import ModalProvider from '@/sharedComponents/Modal/Provider';

// eslint-disable-next-line react/display-name
export default ({ children }) => (
    <ThemeProvider theme={theme}>
        <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
);
