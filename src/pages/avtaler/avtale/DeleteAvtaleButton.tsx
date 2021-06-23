import React from 'react';
import { DeleteButtonWithConfirmation } from '../../../components/buttons/DeleteButtonWithConfirmation';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { useDeleteAvtale } from '../../../services/avtale/useDeleteAvtale';

interface Props {
    avtale: ApiAvtale;
}

export const DeleteAvtaleButton: React.FC<Props> = ({ avtale }) => {
    const deleteAvtaleMutation = useDeleteAvtale();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleDeleteAvtale = () =>
        deleteAvtaleMutation.mutateAsync(avtale.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Avtalen ble slettet` });
            },
            onError: (error) => {
                // TODO: show error message in popover?
                showErrorToast({ title: `Noe gikk galt ved sletting av avtalen` });
            },
        });

    return (
        <DeleteButtonWithConfirmation
            label="avtalen"
            onConfirm={handleDeleteAvtale}
            isLoading={deleteAvtaleMutation.isLoading}
        />
    );
};
