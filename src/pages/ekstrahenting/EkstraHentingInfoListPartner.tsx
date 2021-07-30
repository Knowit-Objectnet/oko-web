import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { isFuture, isPast, startOfDay, startOfToday } from 'date-fns';
import { partition } from 'lodash';
import React from 'react';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { dateTimeToStringIgnoreTimezone, parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';
import { EkstraHentingTable } from './EkstraHentingTable';

export const EkstraHentingInfoListPartner: React.FC = () => {
    const { user } = useAuth();

    const { data: ekstraHentinger } = useEkstraHentingerWithUtlysning({
        after: dateTimeToStringIgnoreTimezone(startOfToday()),
    });

    const sortedEkstraHentinger = sortedEkstraHentingerByDatoDesc(ekstraHentinger ?? []);

    const [paameldteEkstraHentinger, tilbudteEkstraHentinger] = partition<ApiEkstraHenting>(
        sortedEkstraHentinger,
        (ekstraHenting) => ekstraHenting.godkjentUtlysning?.partnerId == user.aktorId,
    );

    const dineKommendeEkstraHentinger = paameldteEkstraHentinger.filter((ekstraHenting) =>
        isFuture(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
    );

    const [ikkePaameldteEkstraHentinger, kanIkkeMeldePaaEkstraHentinger] = partition<ApiEkstraHenting>(
        tilbudteEkstraHentinger,
        (ekstraHenting) =>
            !ekstraHenting.godkjentUtlysning && isFuture(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
    );

    return (
        <VStack>
            <Flex justifyContent="space-between" width="full" marginY="12" alignItems="center">
                <Heading as="h1" fontWeight="normal" fontSize="2xl">
                    Aktive ekstrahentinger
                </Heading>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraHentingTable ekstraHentinger={ikkePaameldteEkstraHentinger} />
            </Box>

            <Flex justifyContent="space-between" width="full" marginY="12" alignItems="center">
                <Heading as="h1" fontWeight="normal" fontSize="2xl">
                    Dine kommende ekstrahentinger
                </Heading>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraHentingTable ekstraHentinger={dineKommendeEkstraHentinger} />
            </Box>
            <Flex justifyContent="space-between" width="full" marginY="12" alignItems="center">
                <Text fontWeight="normal" fontSize="2xl">
                    Utgåtte ekstrahentinger
                </Text>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraHentingTable ekstraHentinger={kanIkkeMeldePaaEkstraHentinger} />
            </Box>
        </VStack>
    );
};
