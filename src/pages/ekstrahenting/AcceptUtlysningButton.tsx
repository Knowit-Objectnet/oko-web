import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { usePartnerAcceptUtlysning } from '../../services/utlysning/usePartnerAcceptUtlysning';
import { useSuccessToast } from '../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../components/toasts/useErrorToast';
import { ApiError } from '../../services/httpClient';
import { Button } from '@chakra-ui/react';
import { colors } from '../../theme/foundations/colors';

interface Props {
    ekstraHenting: ApiEkstraHenting;
}

export const AcceptUtlysningButton: React.FC<Props> = ({ ekstraHenting }) => {
    const acceptUtlysningMutation = usePartnerAcceptUtlysning();
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const acceptUtlysning = () =>
        acceptUtlysningMutation.mutate(
            { id: ekstraHenting.utlysninger[0].id, toAccept: true },
            {
                onSuccess: () => {
                    onApiSubmitSuccess('Påmeldingen ble registrert');
                },
                onError: onApiSubmitError,
            },
        );

    const onApiSubmitSuccess = (successMessage: string) => {
        showSuccessToast({ title: successMessage });
    };

    const onApiSubmitError = (error: ApiError) => {
        // TODO: get details from error and set appropriate message.
        //  If caused by user: set message to correct field
        showErrorToast({ title: 'Uffda, noe gikk galt ved påmeldingen. Vennligst prøv igjen.' });
    };

    return (
        <Button
            backgroundColor={colors.Green}
            color={colors.DarkBlue}
            onClick={acceptUtlysning}
            isLoading={acceptUtlysningMutation.isLoading}
            loadingText="Registrerer..."
        >
            Meld på
        </Button>
    );
};
