import React from 'react';
import { ConfirmationPopover } from '../../../components/buttons/ConfirmationPopover';
import { useErrorToast } from '../../../components/toasts/useErrorToast';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { useDeleteHenteplan } from '../../../services/henteplan/useDeleteHenteplan';
import { DeleteButton } from '../../../components/buttons/DeleteButton';

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
        <ConfirmationPopover
            message={{
                title: 'Du er i ferd med å slette henteplanen. Er du sikker?',
                body: 'Dette vil også slette alle tilknyttede hentinger som ikke er gjennomført ennå.',
                buttonLabel: 'Ja, slett henteplanen',
            }}
            onConfirm={handleDeleteHenteplan}
            isLoading={deleteHenteplanMutation.isLoading}
        >
            <DeleteButton label="Slett" borderRadius="6" aria-label="Slett henteplanen" />
        </ConfirmationPopover>
    );
};
