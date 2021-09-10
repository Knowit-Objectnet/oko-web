import React from 'react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import { useDeleteKontakt } from '../../services/aktor/useDeleteKontakt';
import { useSuccessToast } from '../toasts/useSuccessToast';
import { useErrorToast } from '../toasts/useErrorToast';
import { ConfirmationPopover } from '../buttons/ConfirmationPopover';
import { DeleteButton } from '../buttons/DeleteButton';
import { ButtonProps } from '@chakra-ui/react';

interface Props {
    kontakt: ApiKontakt;
}

export const DeleteKontaktPersonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
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
            message={{
                title: 'Du er i ferd med å slette kontaktpersonen. Er du sikker?',
                buttonLabel: 'Ja, slett kontaktpersonen',
            }}
            onConfirm={handleDeleteKontakt}
            isLoading={deleteKontaktMutation.isLoading}
        >
            <DeleteButton {...props} label="Slett" borderRadius="6" aria-label={`Slett ${kontakt.navn}`} />
        </ConfirmationPopover>
    );
};
