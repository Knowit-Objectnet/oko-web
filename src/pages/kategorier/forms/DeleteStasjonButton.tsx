import * as React from 'react';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { useDeleteStasjon } from '../../../services/stasjon/useDeleteStasjon';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { ConfirmationPopover } from '../../../components/buttons/ConfirmationPopover';
import { DeleteButton } from '../../../components/buttons/DeleteButton';

interface Props {
    stasjon: ApiStasjon;
}

export const DeleteStasjonButton: React.FC<Props> = ({ stasjon }) => {
    const deleteStasjonMutation = useDeleteStasjon();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteStasjon = () =>
        deleteStasjonMutation.mutateAsync(stasjon.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Stasjonen ${stasjon.navn} ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av ${stasjon.navn}` });
            },
        });

    return (
        <ConfirmationPopover
            message={{
                title: 'Du er i ferd med å slette stasjonen. Er du sikker?',
                buttonLabel: 'Ja, slett stasjonen',
            }}
            onConfirm={handleDeleteStasjon}
            isLoading={deleteStasjonMutation.isLoading}
        >
            <DeleteButton label="Slett" aria-label="Slett stasjonen" />
        </ConfirmationPopover>
    );
};
