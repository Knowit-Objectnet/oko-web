import React from 'react';
import { MainRouter } from './routing/MainRouter';
import { theme } from './theme';
import { Helmet } from 'react-helmet';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './auth/AuthProvider';
import { Loading } from './components/Loading';
import 'focus-visible/dist/focus-visible';
import { ErrorBoundary } from 'react-error-boundary';
import { GlobalError } from './components/GlobalError';

const queryClient = new QueryClient();

export const App: React.FC = () => {
    return (
        <ChakraProvider theme={theme}>
            <ErrorBoundary FallbackComponent={GlobalError}>
                <AuthProvider fallback={<Loading isFullPage />}>
                    <QueryClientProvider client={queryClient}>
                        <Helmet titleTemplate="%s – Oslo kommune REG">
                            <html lang="nb" />
                            {/* TODO write a SEO-friendly description: */}
                            <meta name="description" content="Oslo kommune REG" />
                        </Helmet>
                        <MainRouter />
                    </QueryClientProvider>
                </AuthProvider>
            </ErrorBoundary>
        </ChakraProvider>
    );
};

export default App;
