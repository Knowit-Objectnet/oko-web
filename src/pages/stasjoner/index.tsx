import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { AddStasjonButton } from './forms/AddStasjonButton';
import { Flex } from '@chakra-ui/layout';
import { StasjonTable } from './StasjonTable';

const Stasjoner: React.FC = () => (
    <>
        <Helmet>
            <title>Stasjoner</title>
        </Helmet>
        <Flex
            as="main"
            direction="column"
            alignItems="flex-start"
            height="full"
            padding="5"
            marginX="auto"
            width="full"
        >
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="medium" fontSize="4xl">
                    Stasjoner
                </Heading>
                <AddStasjonButton />
            </Flex>
            <StasjonTable />
        </Flex>
    </>
);

export default Stasjoner;
