import React from 'react';
import { MainRouter } from './routing/MainRouter';
import { theme } from './theme';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './auth/AuthProvider';
import { Loading } from './components/Loading';
import 'focus-visible/dist/focus-visible';

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <AuthProvider fallback={<Loading />}>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Helmet titleTemplate="%s – Oslo kommune REG">
                        <html lang="nb" />
                        {/* TODO write a SEO-friendly description: */}
                        <meta name="description" content="Oslo kommune REG" />{' '}
                    </Helmet>
                    <MainRouter />
                </QueryClientProvider>
            </ChakraProvider>
        </AuthProvider>
    );
};

export default App;
