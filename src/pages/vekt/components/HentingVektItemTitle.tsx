import * as React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../../../auth/useAuth';
import { HentingerVektListChildProps } from './HentingVektList';
import { getVektregistreringDate, getVektSum } from '../../../utils/wrappedHentingHelpers';
import { formatDate } from '../../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';

export const HentingVektItemTitle: React.FC<HentingerVektListChildProps> = ({ henting, missingVekt, ...width }) => {
    const { user } = useAuth();

    const getAktorNavnLabel = () => {
        if (user.isPartner) {
            return null;
        }
        return (
            <Text fontWeight="bold" paddingEnd="3">
                {henting.aktorNavn}
            </Text>
        );
    };

    const getVektSumLabel = () => {
        if (missingVekt) {
            return null;
        }
        return <Text whiteSpace="nowrap">{getVektSum(henting)} kg</Text>;
    };

    const getVektStatusLabel = () => {
        if (missingVekt) {
            return (
                <Text whiteSpace="nowrap" fontStyle="italic">
                    Ikke registrert vekt
                </Text>
            );
        }
        return (
            <Text fontSize="sm">
                {getVektregistreringDate(henting)
                    ? `Registrert: ${formatDate(parseISOIgnoreTimezone(getVektregistreringDate(henting)))}`
                    : null}
            </Text>
        );
    };

    return (
        <VStack alignItems="flex-start" spacing="1" {...width}>
            <Flex flexWrap="wrap" alignItems="center" fontSize="xl">
                {getAktorNavnLabel()}
                {getVektSumLabel()}
            </Flex>
            {getVektStatusLabel()}
        </VStack>
    );
};
