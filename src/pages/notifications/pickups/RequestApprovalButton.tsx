import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { Button } from '../../../sharedComponents/Button';
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
            onSuccess: () => {
                alert.show('Valg av sam.partner til ekstrauttak ble registrert suksessfullt.', { type: types.SUCCESS });
            },
            onError: () => {
                alert.show('Noe gikk galt, valg av sam.partner til ekstrauttak ble ikke registrert.', {
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
            text="Godkjenn"
            variant="positive"
            onClick={handleRequestApproval}
            loading={updatePickUpLoading}
            style={{ padding: '0.5rem 1rem', minWidth: '8rem', minHeight: '2.5rem' }}
        />
    );
};
