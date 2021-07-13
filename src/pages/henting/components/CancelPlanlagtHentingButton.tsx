import * as React from 'react';
import { ApiPlanlagtHenting } from '../../../services/henting/PlanlagtHentingService';
import { useUpdateHenting } from '../../../services/henting/useUpdateHenting';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { ConfirmationPopover } from '../../../components/buttons/ConfirmationPopover';
import { Button, ButtonProps } from '@chakra-ui/react';

interface Props {
    henting: ApiPlanlagtHenting;
}

export const CancelPlanlagtHentingButton: React.FC<Props & ButtonProps> = ({ henting, ...props }) => {
    const updateHentingMutation = useUpdateHenting();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleCancelHenting = () =>
        updateHentingMutation.mutateAsync(
            {
                id: henting.id,
                avlyst: true,
                aarsakId: henting.aarsakId || undefined,
            },
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
                title: 'Du er i ferd med å avlyse hentingen. Er du sikker?',
                body: 'Det vil ikke være mulig å angre avlysningen.',
                buttonLabel: 'Ja, avlys hentingen',
            }}
            onConfirm={handleCancelHenting}
            isLoading={updateHentingMutation.isLoading}
            popoverPosition="bottom"
        >
            <Button {...props}>Avlys denne hentingen</Button>
        </ConfirmationPopover>
    );
};
