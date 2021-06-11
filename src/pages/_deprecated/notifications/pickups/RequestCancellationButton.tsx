import * as React from 'react';
// import { types, useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import {
    ApiRequestParams,
    deleteRequest,
    requestsDefaultQueryKey,
} from '../../../../services/_deprecated/RequestService';
import CrossIcon from '../../../../assets/Cross.svg';
import { TextButton } from '../../../../components/_deprecated/buttons/TextButton';
import { useAuth } from '../../../../auth/useAuth';

interface Props {
    pickupId: number;
    onRequestCancellation: (isLoading: boolean) => void;
}

export const RequestCancellationButton: React.FC<Props> = ({ pickupId, onRequestCancellation }) => {
    const { user } = useAuth();
    const partnerId = user.aktorId;
    // const alert = useAlert();

    const queryClient = useQueryClient();
    const deleteRequestMutation = useMutation((request: ApiRequestParams) => deleteRequest(request), {
        onError: () => {
            // alert.show('Noe gikk galt, avmelding til ekstrauttaket ble ikke registrert.', {
            //     type: types.ERROR,
            // });
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
