import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { AddEkstraUttakButton } from './forms/AddEkstraUttakButton';
import { Box, Flex } from '@chakra-ui/layout';
import { EkstraUttakTable } from './EkstraUttakTable';

const EkstraUttak: React.FC = () => (
    <>
        <Helmet>
            <title>Ekstrauttak</title>
        </Helmet>
        <Flex
            as="main"
            direction="column"
            paddingY="5"
            paddingX="10"
            marginX="auto"
            width={{ base: '100%', desktop: '80%' }}
        >
            <AddEkstraUttakButton width="fit-content" marginLeft="auto" />
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="medium" fontSize="4xl">
                    Aktive ekstrauttak
                </Heading>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraUttakTable />
            </Box>
        </Flex>
    </>
);

export default EkstraUttak;
