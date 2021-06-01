import { DeleteButton } from '../../../components/buttons/DeleteButton';
import * as React from 'react';
import { ApiStasjon } from '../../../services-currentapi/stasjon/StasjonService';
import { useDeleteStasjon } from '../../../services-currentapi/stasjon/useDeleteStasjon';
import { useSuccessToast } from '../../../components/toasts/useSuccessToast';
import { useErrorToast } from '../../../components/toasts/useErrorToast';

interface Props {
    stasjon: ApiStasjon;
}

export const DeleteStasjonButton: React.FC<Props> = ({ stasjon }) => {
    const deleteStasjonMutation = useDeleteStasjon();

    const showSuccessToast = useSuccessToast();
    const showErrorToast = useErrorToast();

    const handleStasjonDeletion = () => {
        deleteStasjonMutation.mutate(stasjon.id, {
            onSuccess: () => {
                showSuccessToast({ title: `Stasjonen ${stasjon.navn} ble slettet` });
            },
            onError: (error) => {
                showErrorToast({ title: `Noe gikk galt ved sletting av ${stasjon.navn}: ${error.message}` });
            },
        });
    };

    return (
        <DeleteButton
            label="Slett"
            onClick={handleStasjonDeletion}
            isLoading={deleteStasjonMutation.isLoading}
            minWidth="20"
        />
    );
};
