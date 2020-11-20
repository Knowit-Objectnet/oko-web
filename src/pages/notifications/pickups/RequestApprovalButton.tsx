import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { Button } from '../../../sharedComponents/buttons/Button';
import { ApiPickUpPatch, patchPickUp, pickUpsDefaultQueryKey } from '../../../api/PickUpService';

interface Props {
    pickupId: number;
    partnerId: number;
}

export const RequestApprovalButton: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [updatePickUpMutation, { isLoading: updatePickUpLoading }] = useMutation(
        (updatedPickUp: ApiPickUpPatch) => patchPickUp(updatedPickUp, keycloak.token),
        {
            onError: () => {
                alert.show('Noe gikk galt, valg av samarbeidspartner til ekstrauttak ble ikke registrert.', {
                    type: types.ERROR,
                });
            },
            onSettled: () => {
                queryCache.invalidateQueries(pickUpsDefaultQueryKey);
            },
        },
    );

    const handleRequestApproval = () => {
        const updatedPickUp: ApiPickUpPatch = {
            id: props.pickupId,
            chosenPartnerId: props.partnerId,
        };
        updatePickUpMutation(updatedPickUp);
    };

    return (
        <Button
            variant="positive"
            fillWidth
            size="small"
            onClick={handleRequestApproval}
            isLoading={updatePickUpLoading}
        >
            Godkjenn
        </Button>
    );
};
