import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/layout';
import { KategoriTable } from './KategoriTable';
import { AddKategoriButton } from './forms/AddKategoriButton';

const Kategorier: React.FC = () => (
    <>
        <Helmet>
            <title>Kategorier</title>
        </Helmet>
        <Flex as="main" direction="column" paddingY="5" paddingX="10" marginX="auto" width="full">
            <Flex
                justifyContent="space-between"
                width="full"
                marginY="4"
                alignItems="center"
                borderBottom="1px solid"
                borderBottomColor="gray.200"
            >
                <Heading width="full" as="h1" fontWeight="normal" fontSize="4xl" marginBottom="4">
                    Kategorier
                </Heading>
                <AddKategoriButton />
            </Flex>
            <Box width="full" overflowX="auto">
                <KategoriTable />
            </Box>
        </Flex>
    </>
);

export default Kategorier;
