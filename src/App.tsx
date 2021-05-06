import React from 'react';
import { MainRouter } from './routing/MainRouter';
import ModalProvider from './components/modal/Provider';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import { oldTheme, theme } from './theme';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './auth/AuthProvider';
import { Loading } from './components/Loading';
import { GlobalStyle } from './global-styles';

const alertOptions = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '30px',
    transition: transitions.SCALE,
};

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <AuthProvider fallback={<Loading />}>
            <ChakraProvider theme={theme}>
                <ThemeProvider theme={oldTheme}>
                    <GlobalStyle />
                    <AlertProvider template={AlertTemplate} {...alertOptions}>
                        <QueryClientProvider client={queryClient}>
                            <ModalProvider>
                                <Helmet titleTemplate="Oslo kommune REG | %s">
                                    <html lang="nb" />
                                    {/* TODO write a SEO-friendly description: */}
                                    <meta name="description" content="Oslo kommune REG" />{' '}
                                </Helmet>
                                <MainRouter />
                            </ModalProvider>
                        </QueryClientProvider>
                    </AlertProvider>
                </ThemeProvider>
            </ChakraProvider>
        </AuthProvider>
    );
};

export default App;
