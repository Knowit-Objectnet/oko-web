import * as React from 'react';
import { Header } from './Header';
import { PageRouter } from '../../routing/PageRouter';
import { Flex } from '@chakra-ui/layout';
import { usePrefetchPartnere } from '../../services/partner/usePrefetchPartnere';
import { usePrefetchStasjoner } from '../../services/stasjon/usePrefetchStasjoner';
import { usePrefetchKategorier } from '../../services/kategori/usePrefetchKategorier';
import { SkipNavContent } from '@chakra-ui/skip-nav';

export const Dashboard: React.FC = () => {
    // We do prefetching here so that these entities are available for faster rendering when needed
    usePrefetchStasjoner();
    usePrefetchPartnere();
    usePrefetchKategorier();

    return (
        <Flex direction="column" minHeight="100vh" width="full">
            <Header />
            <SkipNavContent />
            <Flex flex="1" overflowY="auto" marginBottom={{ base: 'navbar.mobile', tablet: '0' }}>
                <PageRouter />
            </Flex>
        </Flex>
    );
};
