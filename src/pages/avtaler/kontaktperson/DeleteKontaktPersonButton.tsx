import React from 'react';
import { ApiKontakt } from '../../../services/aktor/KontaktService';
import { useDeleteKontakt } from '../../../services/aktor/useDeleteKontakt';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { ConfirmationPopover } from '../../../components/buttons/ConfirmationPopover';
import { DeleteButton } from '../../../components/buttons/DeleteButton';

interface Props {
    kontakt: ApiKontakt;
}

export const DeleteKontaktPersonButton: React.FunctionComponent<Props> = ({ kontakt }) => {
    const deleteKontaktMutation = useDeleteKontakt();
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteKontakt = () =>
        deleteKontaktMutation.mutateAsync(kontakt.id, {
            onSuccess: () => {
                showSuccessToast({ title: `${kontakt.navn} ble slettet` });
            },
            onError: (error) => {
                showErrorToast({ title: `Noe gikk galt ved sletting av ${kontakt.navn}` });
            },
        });

    return (
        <ConfirmationPopover
            message="Du er i ferd med å slette kontaktpersonen. Er du sikker?"
            buttonLabel="Ja, slett kontaktpersonen"
            onConfirm={handleDeleteKontakt}
            isLoading={deleteKontaktMutation.isLoading}
        >
            <DeleteButton label="Slett" aria-label={`Slett ${kontakt.navn}`} />
        </ConfirmationPopover>
    );
};
