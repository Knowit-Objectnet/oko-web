import * as React from 'react';
import { Header } from './Header';
import { PageRouter } from '../../routing/PageRouter';
import { Flex } from '@chakra-ui/layout';
import { useQueryClient } from 'react-query';
import { prefetchStasjoner } from '../../services-currentapi/hooks/useStasjoner';
import { prefetchPartnere } from '../../services-currentapi/hooks/usePartnere';

export const Dashboard: React.FC = () => {
    const queryClient = useQueryClient();

    // We do prefetching here so that these entities are available for faster rendering when needed
    prefetchStasjoner(queryClient);
    prefetchPartnere(queryClient);

    return (
        <Flex direction="column" minHeight="100vh" width="full">
            <Header />
            <Flex flex="1" overflowY="auto" marginBottom={{ base: 'navbar.mobile', tablet: '0' }}>
                <PageRouter />
            </Flex>
        </Flex>
    );
};
