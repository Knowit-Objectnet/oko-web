import * as React from 'react';
import { Header } from './Header';
import { PageRouter } from '../../routing/PageRouter';
import { Box, Flex } from '@chakra-ui/layout';
import { useQueryClient } from 'react-query';
import { prefetchStations } from '../../services/hooks/useStations';
import { prefetchPartners } from '../../services/hooks/usePartners';

export const Dashboard: React.FC = () => {
    const queryClient = useQueryClient();

    // We do prefetching here so that these entities are available for faster rendering when needed
    prefetchStations(queryClient);
    prefetchPartners(queryClient);

    return (
        <Flex direction="column" minHeight="100vh" width="100%">
            <Header />
            <Box flex="1" overflowY="auto" paddingBottom={{ base: '64px', md: 0 }}>
                <PageRouter />
            </Box>
        </Flex>
    );
};
