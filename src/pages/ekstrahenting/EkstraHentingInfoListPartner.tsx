import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { EkstraHentingTable } from './EkstraHentingTable';

interface Props {
    dineKommendeEkstraHentinger: ApiEkstraHenting[];
    aktiveEkstraHentinger: ApiEkstraHenting[];
}

export const EkstraHentingInfoListPartner: React.FC<Props> = ({
    dineKommendeEkstraHentinger,
    aktiveEkstraHentinger,
}) => {
    return (
        <VStack>
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="normal" fontSize="2xl">
                    Dine kommende ekstrahentinger
                </Heading>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraHentingTable ekstraHentinger={dineKommendeEkstraHentinger} />
            </Box>
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Text fontWeight="normal" fontSize="2xl">
                    Aktive ekstrahentinger
                </Text>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraHentingTable ekstraHentinger={aktiveEkstraHentinger} />
            </Box>
        </VStack>
    );
};
