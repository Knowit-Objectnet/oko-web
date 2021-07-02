import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { AddStasjonButton } from './forms/AddStasjonButton';
import { Box, Flex } from '@chakra-ui/layout';
import { StasjonTable } from './KategoriTable';

const Kategorier: React.FC = () => (
    <>
        <Helmet>
            <title>Kategorier</title>
        </Helmet>
        <Flex as="main" direction="column" paddingY="5" paddingX="10" marginX="auto" width="full">
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="medium" fontSize="4xl">
                    Kategorier
                </Heading>
                <AddStasjonButton />
            </Flex>
            <Box width="full" overflowX="auto">
                <StasjonTable />
            </Box>
        </Flex>
    </>
);

export default Kategorier;
