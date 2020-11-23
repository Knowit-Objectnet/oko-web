import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiRequestParams, deleteRequest, requestsDefaultQueryKey } from '../../../api/RequestService';
import Cross from '../../../assets/Cross.svg';
import { Button } from '../../../sharedComponents/buttons/Button';
import { useState } from 'react';

interface Props {
    pickupId: number;
    partnerId: number;
}

export const RequestCancellationButton: React.FC<Props> = ({ pickupId, partnerId }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();
    const [deleteRequestLoading, setDeleteRequestLoading] = useState(false);

    const [deleteRequestMutation] = useMutation((request: ApiRequestParams) => deleteRequest(request, keycloak.token), {
        onMutate: () => setDeleteRequestLoading(true),
        onError: () => {
            setDeleteRequestLoading(false);
            alert.show('Noe gikk galt, avmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        },
        onSettled: () => queryCache.invalidateQueries([requestsDefaultQueryKey, { pickupId, partnerId }]),
    });

    const handleRequestCancellationClick = () => {
        const requestToCancel: ApiRequestParams = {
            pickupId,
            partnerId,
        };
        deleteRequestMutation(requestToCancel);
    };

    return (
        <Button
            variant="text"
            leftIcon={<Cross />}
            onClick={handleRequestCancellationClick}
            isLoading={deleteRequestLoading}
        >
            Meld av
        </Button>
    );
};
