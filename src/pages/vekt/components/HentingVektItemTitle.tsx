import * as React from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../../../auth/useAuth';
import { HentingerVektListChildProps } from './HentingVektList';
import { getAktorNavn, getVektregistreringDate, getVektSum } from '../../../utils/wrappedHentingHelpers';
import { formatDate } from '../../../utils/formatDateTime';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';

export const HentingVektItemTitle: React.FC<HentingerVektListChildProps> = ({ henting, missingVekt, ...props }) => {
    const { user } = useAuth();

    return (
        <VStack alignItems="flex-start" spacing="1" {...props}>
            <Flex flexWrap="wrap" alignItems="center">
                {!user.isPartner ? (
                    <Text fontSize="1.25rem" fontWeight="bold" paddingEnd="3">
                        {getAktorNavn(henting)}
                    </Text>
                ) : null}
                {!missingVekt ? (
                    <Text fontSize="1.25rem" whiteSpace="nowrap">
                        {getVektSum(henting)} kg
                    </Text>
                ) : null}
            </Flex>
            {missingVekt ? (
                <Text whiteSpace="nowrap" fontStyle="italic">
                    Ikke registrert vekt
                </Text>
            ) : (
                <Text fontSize="0.8rem">
                    {getVektregistreringDate(henting)
                        ? `Registrert: ${formatDate(parseISOIgnoreTimezone(getVektregistreringDate(henting)))}`
                        : null}
                </Text>
            )}
        </VStack>
    );
};
