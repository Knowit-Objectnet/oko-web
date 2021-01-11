import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { useMutation, useQueryClient } from 'react-query';
import { ApiPickUpPatch, patchPickUp, pickUpsDefaultQueryKey } from '../../../api/PickUpService';
import { PositiveButton } from '../../../sharedComponents/buttons/PositiveButton';

interface Props {
    pickupId: number;
    partnerId: number;
    onRequestApproval: (isLoading: boolean) => void;
}

export const RequestApprovalButton: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const queryClient = useQueryClient();
    const updatePickUpMutation = useMutation(
        (updatedPickUp: ApiPickUpPatch) => patchPickUp(updatedPickUp, keycloak.token),
        {
            onError: () => {
                alert.show('Noe gikk galt, valg av samarbeidspartner til ekstrauttak ble ikke registrert.', {
                    type: types.ERROR,
                });
            },
            onSettled: () => {
                return queryClient.invalidateQueries(pickUpsDefaultQueryKey);
            },
        },
    );

    const handleRequestApproval = async () => {
        props.onRequestApproval(true);
        const updatedPickUp: ApiPickUpPatch = {
            id: props.pickupId,
            chosenPartnerId: props.partnerId,
        };
        await updatePickUpMutation.mutateAsync(updatedPickUp);
        props.onRequestApproval(false);
    };

    return (
        <PositiveButton fillWidth size="small" onClick={handleRequestApproval}>
            Godkjenn
        </PositiveButton>
    );
};
