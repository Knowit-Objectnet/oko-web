import * as React from 'react';
import { useSuccessToast } from '../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../components/toasts/useErrorToast';
import { ConfirmationPopover } from '../../components/buttons/ConfirmationPopover';
import { DeleteButton } from '../../components/buttons/DeleteButton';
import { useDeleteAarsak } from '../../services/aarsak/useDeleteAarsak';
import { ApiAarsak } from '../../services/aarsak/AarsakService';

interface Props {
    aarsak: ApiAarsak;
}

export const DeleteAarsakButton: React.FC<Props> = ({ aarsak }) => {
    const deleteAarsakMutation = useDeleteAarsak();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteAarsak = () =>
        deleteAarsakMutation.mutateAsync(aarsak.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Årsaken ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av årsaken` });
            },
        });

    return (
        <ConfirmationPopover
            message={{
                title: 'Du er i ferd med å slette årsaken. Er du sikker?',
                buttonLabel: 'Ja, slett årsaken',
            }}
            onConfirm={handleDeleteAarsak}
            isLoading={deleteAarsakMutation.isLoading}
        >
            <DeleteButton label="Slett" aria-label="Slett årsaken" />
        </ConfirmationPopover>
    );
};
