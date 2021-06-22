import React from 'react';
import { ApiKontakt } from '../../../services/aktor/KontaktService';
import { useDeleteKontakt } from '../../../services/aktor/useDeleteKontakt';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { DeleteButtonWithConfirmation } from '../../../components/buttons/DeleteButtonWithConfirmation';

interface Props {
    kontakt: ApiKontakt;
}

export const DeleteKontaktPersonButton: React.FunctionComponent<Props> = ({ kontakt }) => {
    const deleteKontaktMutation = useDeleteKontakt();
    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteKontakt = () =>
        deleteKontaktMutation.mutate(kontakt.id, {
            onSuccess: () => {
                showSuccessToast({ title: `${kontakt.navn} ble slettet` });
            },
            onError: (error) => {
                showErrorToast({ title: `Noe gikk galt ved sletting av ${kontakt.navn}` });
            },
        });

    return (
        <DeleteButtonWithConfirmation
            label="kontaktpersonen"
            onConfirm={handleDeleteKontakt}
            isLoading={deleteKontaktMutation.isLoading}
        />
    );
};
