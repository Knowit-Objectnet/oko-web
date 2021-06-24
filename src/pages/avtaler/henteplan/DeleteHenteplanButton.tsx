import React from 'react';
import { DeleteButtonWithConfirmation } from '../../../components/buttons/DeleteButtonWithConfirmation';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { useDeleteHenteplan } from '../../../services/henteplan/useDeleteHenteplan';

interface Props {
    henteplan: ApiHenteplan;
}

export const DeleteHenteplanButton: React.FC<Props> = ({ henteplan }) => {
    const deleteHenteplanMutation = useDeleteHenteplan();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteHenteplan = () =>
        deleteHenteplanMutation.mutateAsync(henteplan.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Henteplanen ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av henteplanen` });
            },
        });

    return (
        <DeleteButtonWithConfirmation
            label="henteplanen"
            onConfirm={handleDeleteHenteplan}
            isLoading={deleteHenteplanMutation.isLoading}
        />
    );
};
