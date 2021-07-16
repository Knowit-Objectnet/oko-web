import { Box, Text, Flex, Button, Icon } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { usePartnere } from '../../services/partner/usePartnere';
import { UtlysFlerePartnereButton } from './forms/UtlysFlerePartnereButton';
import { usePartnerAcceptUtlysning } from '../../services/utlysning/usePartnerAcceptUtlysning';
import { useSuccessToast } from '../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../components/toasts/useErrorToast';
import { ApiError } from '../../services/httpClient';
import Check from '../../assets/Check.svg';
import Cross from '../../assets/Cross.svg';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { isAfter, isBefore } from 'date-fns';

interface Props {
    henting: ApiEkstraHenting;
    partnerId: string;
}

export const PartnerPameldingInfo: React.FC<Props> = ({ henting, partnerId }) => {
    const acceptUtlysningMutation = usePartnerAcceptUtlysning();
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const acceptUtlysning = (utlysningId: string) => {
        acceptUtlysningMutation.mutate(
            { id: utlysningId, toAccept: true },
            {
                onSuccess: () => {
                    onApiSubmitSuccess('Utlysning godtatt!');
                },
                onError: onApiSubmitError,
            },
        );
    };

    const onApiSubmitSuccess = (successMessage: string) => {
        showSuccessToast({ title: successMessage });
    };

    const onApiSubmitError = (error: ApiError) => {
        showErrorToast({ title: error.message });
    };

    const getUtgatt = (): JSX.Element => {
        return (
            <Flex color="onError">
                <Icon marginRight="2" fill="onError">
                    <Cross />
                </Icon>
                <Text fontWeight="semibold">Utgått</Text>
            </Flex>
        );
    };

    const isPassed = () => {
        return isAfter(Date.now(), parseISOIgnoreTimezone(henting.startTidspunkt));
    };

    return (
        <Box>
            {isPassed() ? getUtgatt() : null}

            {!isPassed() && henting.godkjentUtlysning?.partnerId === partnerId ? (
                <Flex color="DarkGreen">
                    <Icon marginRight="2" fill="DarkGreen">
                        <Check />
                    </Icon>
                    <Text fontWeight="semibold">Meldt på</Text>
                </Flex>
            ) : null}

            {!isPassed() && henting.godkjentUtlysning && henting.godkjentUtlysning.partnerId != partnerId
                ? getUtgatt()
                : null}

            {!isPassed() && !henting.godkjentUtlysning ? (
                <Button
                    backgroundColor="Green"
                    color="DarkBlue"
                    onClick={() => acceptUtlysning(henting.utlysninger[0].id)}
                >
                    Meld på
                </Button>
            ) : null}
        </Box>
    );
};
