import * as React from 'react';
import { ApiPlanlagtHenting } from '../../services/henting/HentingService';
import { useUpdateHenting } from '../../services/henting/useUpdateHenting';
import { useSuccessToast } from '../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../components/toasts/useErrorToast';
import { ConfirmationPopover } from '../../components/buttons/ConfirmationPopover';
import { Button } from '@chakra-ui/react';

export const CancelPlanlagtHentingButton: React.FC<{ henting: ApiPlanlagtHenting }> = ({ henting }) => {
    const updateHentingMutation = useUpdateHenting();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteHenteplan = () =>
        updateHentingMutation.mutateAsync(
            { id: henting.id, avlys: true },
            {
                onSuccess: () => {
                    showSuccessToast({ title: `Hentingen ble avlyst` });
                },
                onError: (error) => {
                    // TODO: show error message in popover?
                    showErrorToast({ title: `Noe gikk galt, klarte ikke å avlyse hentingen` });
                },
            },
        );

    // TODO: add option to give a reason for cancelling
    return (
        <ConfirmationPopover
            message={{
                title: 'Du er i ferd med å avlyse hentingen, er du sikker?',
                body: 'Det vil ikke være mulig å angre avlysningen.',
                buttonLabel: 'Ja, avlys hentingen',
            }}
            onConfirm={handleDeleteHenteplan}
            isLoading={updateHentingMutation.isLoading}
            popoverPosition="bottom-start"
        >
            <Button variant="primary" size="lg">
                Avlys denne hentingen
            </Button>
        </ConfirmationPopover>
    );
};
