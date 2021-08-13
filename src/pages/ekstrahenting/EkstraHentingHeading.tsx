import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { EkstraHentingTable } from './EkstraHentingTable';
import { AddEkstraHentingButton } from './forms/AddEkstraHentingButton';

interface Props {
    ekstraHentinger: Array<ApiEkstraHenting>;
    label: string;
    isLoading: boolean;
    isError: boolean;
    isPast: boolean;
}

export const EkstraHentingHeading: React.FC<Props> = ({ ekstraHentinger, label, isLoading, isError, isPast }) => {
    const { user } = useAuth();
    return (
        <>
            <Flex
                justifyContent="space-between"
                width="full"
                marginY="4"
                marginTop="12"
                alignItems="center"
                direction={{ base: 'column', tablet: 'row' }}
            >
                <Heading as="h1" fontWeight="normal" fontSize="2xl">
                    {label}
                </Heading>
                {user.isAdmin || user.isStasjon ? (
                    <AddEkstraHentingButton
                        width="fit-content"
                        marginLeft={{ tablet: 'auto', base: 'none' }}
                        marginTop={{ tablet: '0', base: '10px' }}
                        borderRadius="6"
                        backgroundColor="Green"
                    />
                ) : null}
            </Flex>
            <Box width="full" overflowX="auto" marginBottom="12">
                <EkstraHentingTable
                    ekstraHentinger={ekstraHentinger}
                    isLoading={isLoading}
                    isError={isError}
                    isPast={isPast}
                />
            </Box>
        </>
    );
};
