import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiRequestParams, deleteRequest, requestsDefaultQueryKey } from '../../../api/RequestService';
import CrossIcon from '../../../assets/Cross.svg';
import { TextButton } from '../../../sharedComponents/buttons/TextButton';

interface Props {
    pickupId: number;
    partnerId: number;
    onRequestCancellation: (isLoading: boolean) => void;
}

export const RequestCancellationButton: React.FC<Props> = ({ pickupId, partnerId, onRequestCancellation }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [deleteRequestMutation] = useMutation((request: ApiRequestParams) => deleteRequest(request, keycloak.token), {
        onSuccess: () => queryCache.invalidateQueries([requestsDefaultQueryKey, { pickupId, partnerId }]),
        onError: () => {
            alert.show('Noe gikk galt, avmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        },
    });

    const handleRequestCancellationClick = async () => {
        onRequestCancellation(true);
        const requestToCancel: ApiRequestParams = {
            pickupId,
            partnerId,
        };
        await deleteRequestMutation(requestToCancel);
        onRequestCancellation(false);
    };

    return (
        <TextButton leftIcon={<CrossIcon />} onClick={handleRequestCancellationClick}>
            Meld av
        </TextButton>
    );
};
