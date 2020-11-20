import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { Button } from '../../../sharedComponents/buttons/Button';
import { ApiRequestPost, postRequest, requestsDefaultQueryKey } from '../../../api/RequestService';

interface Props {
    pickupId: number;
    partnerId: number;
}

export const RequestRegistrationButton: React.FC<Props> = ({ pickupId, partnerId }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [addRequestMutation, { isLoading: addRequestLoading }] = useMutation(
        (newRequest: ApiRequestPost) => postRequest(newRequest, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Påmelding til ekstrauttaket ble registrert.', { type: types.SUCCESS });
            },
            onError: () => {
                alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
            },
            onSettled: () => {
                queryCache.invalidateQueries(requestsDefaultQueryKey);
            },
        },
    );

    const handleRequestRegistrationClick = () => {
        const newRequest: ApiRequestPost = {
            pickupId,
            partnerId,
        };
        addRequestMutation(newRequest);
    };

    return (
        <Button variant="positive" onClick={handleRequestRegistrationClick} isLoading={addRequestLoading}>
            Meld deg på ekstrauttak
        </Button>
    );
};
