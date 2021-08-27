import { Box, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import Check from '../../assets/Check.svg';
import { useAuth } from '../../auth/useAuth';
import { hasEnded } from '../../utils/wrappedHentingHelpers';
import { AcceptUtlysningButton } from './AcceptUtlysningButton';
import { colors } from '../../theme/foundations/colors';

interface Props {
    ekstraHenting: ApiEkstraHenting;
}

export const PartnerPameldingInfo: React.FC<Props> = ({ ekstraHenting }) => {
    const { user } = useAuth();

    const isPassed = hasEnded(ekstraHenting);
    const noUserAccepted = !ekstraHenting.godkjentUtlysning;
    const userCanAccept = !isPassed && noUserAccepted;

    const utgattMessage = (aarsak: string) => (
        <VStack alignItems="flex-start" marginTop="0.5rem">
            <Text fontWeight="semibold">Beklager</Text>
            <Text>{aarsak}</Text>
        </VStack>
    );

    const getPameldingStatus = () => {
        const thisUserAccepted =
            ekstraHenting.godkjentUtlysning && user.ownsResource(ekstraHenting.godkjentUtlysning.partnerId);
        const otherUserAccepted =
            ekstraHenting.godkjentUtlysning && !user.ownsResource(ekstraHenting.godkjentUtlysning.partnerId);
        const hasExpired = isPassed && !thisUserAccepted;

        if (hasExpired) {
            return utgattMessage('Du rakk ikke melde deg på før ekstrahentingen var slutt');
        }

        if (otherUserAccepted) {
            return utgattMessage('Noen andre har meldt seg på');
        }

        if (thisUserAccepted) {
            console.log('Accepted');
            return (
                <Flex color="DarkGreen" align="center">
                    <Icon as={Check} marginRight="2" fill="DarkGreen" />
                    <Text fontWeight="semibold">Meldt på</Text>
                </Flex>
            );
        }

        return null;
    };

    return (
        <Box marginTop="0.5rem">
            {userCanAccept ? <AcceptUtlysningButton ekstraHenting={ekstraHenting} /> : getPameldingStatus()}
        </Box>
    );
};
