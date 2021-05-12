import * as React from 'react';
import { Header } from './Header';
import { PageRouter } from '../../routing/PageRouter';
import { Box, Flex } from '@chakra-ui/layout';

export const Dashboard: React.FC = () => (
    <Flex direction="column" minHeight="100vh" width="100vw">
        <Header />
        <Box as="main" flex="1" overflowY="auto" paddingBottom={{ base: '64px', md: 0 }}>
            <PageRouter />
        </Box>
    </Flex>
);
