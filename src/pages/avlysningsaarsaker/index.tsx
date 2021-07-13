import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import { AddAarsakButton } from './AddAarsakButton';
import { AarsakTable } from './AarsakTable';

const Aarsaker: React.FC = () => (
    <>
        <Helmet>
            <title>Avlysningstekster</title>
        </Helmet>
        <Flex as="main" direction="column" paddingY="5" paddingX="10" marginX="auto" width="full">
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="medium" fontSize="4xl">
                    Avlysningstekster
                </Heading>
                <AddAarsakButton />
            </Flex>
            <Box width="full" overflowX="auto">
                <AarsakTable />
            </Box>
        </Flex>
    </>
);

export default Aarsaker;
