import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { AddEkstraHentingButton } from './forms/AddEkstraHentingButton';
import { Box, Flex } from '@chakra-ui/layout';
import { EkstraHentingTable } from './EkstraHentingTable';
import { useAuth } from '../../auth/useAuth';

const EkstraHenting: React.FC = () => {
    const { user } = useAuth();

    return (
        <>
            <Helmet>
                <title>Ekstrahenting</title>
            </Helmet>
            <Flex
                as="main"
                direction="column"
                paddingY="5"
                paddingX="10"
                marginX="auto"
                width={{ base: '100%', desktop: '80%' }}
            >
                {user.isAdmin || user.isStasjon ? (
                    <AddEkstraHentingButton
                        width="fit-content"
                        marginLeft="auto"
                        borderRadius="6"
                        backgroundColor="Green"
                    />
                ) : null}
                <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                    <Heading as="h1" fontWeight="medium" fontSize="4xl">
                        Aktive ekstrahentinger
                    </Heading>
                </Flex>
                <Box width="full" overflowX="auto">
                    <EkstraHentingTable />
                </Box>
            </Flex>
        </>
    );
};

export default EkstraHenting;
