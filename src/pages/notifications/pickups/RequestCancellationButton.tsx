import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { useMutation, useQueryClient } from 'react-query';
import { ApiRequestParams, deleteRequest, requestsDefaultQueryKey } from '../../../services/RequestService';
import CrossIcon from '../../../assets/Cross.svg';
import { TextButton } from '../../../components/buttons/TextButton';

interface Props {
    pickupId: number;
    partnerId: number;
    onRequestCancellation: (isLoading: boolean) => void;
}

export const RequestCancellationButton: React.FC<Props> = ({ pickupId, partnerId, onRequestCancellation }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const queryClient = useQueryClient();
    const deleteRequestMutation = useMutation((request: ApiRequestParams) => deleteRequest(request, keycloak.token), {
        onError: () => {
            alert.show('Noe gikk galt, avmelding til ekstrauttaket ble ikke registrert.', {
                type: types.ERROR,
            });
        },
        onSettled: () => {
            // The Promise from `invalidateQueries` will resolve when matched queries are done refetching.
            // We return this Promise so that `mutateAsync` can be used to await refetching.
            return queryClient.invalidateQueries([requestsDefaultQueryKey, { pickupId, partnerId }]);
        },
    });

    const handleRequestCancellationClick = async () => {
        onRequestCancellation(true);
        const requestToCancel: ApiRequestParams = {
            pickupId,
            partnerId,
        };
        await deleteRequestMutation.mutateAsync(requestToCancel);
        onRequestCancellation(false);
    };

    return (
        <TextButton leftIcon={<CrossIcon />} onClick={handleRequestCancellationClick}>
            Meld av
        </TextButton>
    );
};
