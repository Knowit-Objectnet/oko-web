import React from 'react';
import { MainRouter } from './routing/MainRouter';
import ModalProvider from './components/modal/Provider';
import AlertTemplate from 'react-alert-template-basic';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import { ThemeProvider } from 'styled-components';
import { oldTheme } from './theme/theme';
import { theme } from './theme';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './auth/AuthProvider';
import { Loading } from './components/Loading';
import { prefetchStations } from './services/deprecated/hooks/useStations';
import { prefetchPartners } from './services/deprecated/hooks/usePartners';
import 'focus-visible/dist/focus-visible';

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
                {/* TODO: remove ThemeProvider when migration from styled-components is complete */}
                <ThemeProvider theme={oldTheme}>
                    {/* TODO: remove AlertProvider when migration to Chakra-UI alerts is complete */}
                    <AlertProvider template={AlertTemplate} {...alertOptions}>
                        <QueryClientProvider client={queryClient}>
                            {/* TODO: remove ModalProvider when migration to Chakra-UI modals is complete */}
                            <ModalProvider>
                                <Helmet titleTemplate="%s – Oslo kommune REG">
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
