import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { Button } from '../../../sharedComponents/buttons/Button';
import { ApiPickUpPatch, patchPickUp, pickUpsDefaultQueryKey } from '../../../api/PickUpService';
import { useState } from 'react';

interface Props {
    pickupId: number;
    partnerId: number;
    requestApprovalLoading: boolean;
    onRequestApprovalLoading: (isLoading: boolean) => void;
}

export const RequestApprovalButton: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();
    const [updatePickUpLoading, setUpdatePickUpLoading] = useState(false);

    const [updatePickUpMutation] = useMutation(
        (updatedPickUp: ApiPickUpPatch) => patchPickUp(updatedPickUp, keycloak.token),
        {
            onMutate: () => {
                setUpdatePickUpLoading(true);
                props.onRequestApprovalLoading(true);
            },
            onError: () => {
                setUpdatePickUpLoading(false);
                props.onRequestApprovalLoading(false);
                alert.show('Noe gikk galt, valg av samarbeidspartner til ekstrauttak ble ikke registrert.', {
                    type: types.ERROR,
                });
            },
            onSettled: () => queryCache.invalidateQueries(pickUpsDefaultQueryKey),
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
            disabled={props.requestApprovalLoading}
        >
            Godkjenn
        </Button>
    );
};
