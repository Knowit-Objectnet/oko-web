import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import { ApiPickUpPatch, patchPickUp, pickUpsDefaultQueryKey } from '../../../services/PickUpService';
import { PositiveButton } from '../../../components/buttons/PositiveButton';
import { useAuth } from '../../../auth/useAuth';

interface Props {
    pickupId: number;
    partnerId: number;
    onRequestApproval: (isLoading: boolean) => void;
}

export const RequestApprovalButton: React.FC<Props> = ({ pickupId, partnerId, onRequestApproval }) => {
    const { authToken } = useAuth();
    const alert = useAlert();

    const queryClient = useQueryClient();
    const updatePickUpMutation = useMutation((updatedPickUp: ApiPickUpPatch) => patchPickUp(updatedPickUp, authToken), {
        onError: () => {
            alert.show('Noe gikk galt, valg av samarbeidspartner til ekstrauttak ble ikke registrert.', {
                type: types.ERROR,
            });
        },
        onSettled: () => {
            // The Promise from `invalidateQueries` will resolve when matched queries are done refetching.
            // We return this Promise so that `mutateAsync` can be used to await refetching.
            return queryClient.invalidateQueries(pickUpsDefaultQueryKey);
        },
    });

    const handleRequestApproval = async () => {
        onRequestApproval(true);
        const updatedPickUp: ApiPickUpPatch = {
            id: pickupId,
            chosenPartnerId: partnerId,
        };
        await updatePickUpMutation.mutateAsync(updatedPickUp);
        onRequestApproval(false);
    };

    return (
        <PositiveButton fillWidth size="small" onClick={handleRequestApproval}>
            Godkjenn
        </PositiveButton>
    );
};
