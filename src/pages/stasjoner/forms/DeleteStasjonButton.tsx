import { DeleteButton } from '../../../components/buttons/DeleteButton';
import * as React from 'react';
import { ApiStasjon } from '../../../services-currentapi/StasjonService';
import { useDeleteStasjon } from '../../../services-currentapi/hooks/useDeleteStasjon';

interface Props {
    stasjon: ApiStasjon;
}

export const DeleteStasjonButton: React.FC<Props> = ({ stasjon }) => {
    const deleteStasjonMutation = useDeleteStasjon();

    const handleStasjonDeletion = () => {
        deleteStasjonMutation.mutate(stasjon.id, {
            onSuccess: () => {
                // TODO Chakra alert: success
                alert(`Slettet stasjon ${stasjon.navn}`);
            },
            onError: (error) => {
                // TODO Chakra alert: failure
                alert(`Noe gikk galt ved sletting av ${stasjon.navn}: ${error.message}`);
            },
        });
    };

    return <DeleteButton label="Slett" onClick={handleStasjonDeletion} isLoading={deleteStasjonMutation.isLoading} />;
};
