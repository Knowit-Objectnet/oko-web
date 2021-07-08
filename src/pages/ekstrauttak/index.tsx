import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading } from '@chakra-ui/react';
import { AddEkstraUttakButton } from './forms/AddEkstraUttakButton';
import { Box, Flex } from '@chakra-ui/layout';
import { EkstraUttakTable } from './EkstraUttakTable';
import { useAuth } from '../../auth/useAuth';

const EkstraUttak: React.FC = () => {
    const { user } = useAuth();

    return (
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
                {user.isAdmin || user.isStasjon ? <AddEkstraUttakButton width="fit-content" marginLeft="auto" /> : null}
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
};

export default EkstraUttak;
