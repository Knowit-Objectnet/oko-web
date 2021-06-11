import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import { ApiRequestPost, postRequest, requestsDefaultQueryKey } from '../../../services/deprecated/RequestService';
import { PositiveButton } from '../../../components/_deprecated/buttons/PositiveButton';
import { useAuth } from '../../../auth/useAuth';

interface Props {
    pickupId: number;
    onRequestRegistration: (isLoading: boolean) => void;
}

export const RequestRegistrationButton: React.FC<Props> = ({ pickupId, onRequestRegistration }) => {
    const { user } = useAuth();
    const partnerId = user.aktorId as number; // TODO: find a way to handle undefined so we can remove this type assertion
    const alert = useAlert();

    const queryClient = useQueryClient();
    const addRequestMutation = useMutation((newRequest: ApiRequestPost) => postRequest(newRequest), {
        onError: () => {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        },
        onSettled: () => {
            // The Promise from `invalidateQueries` will resolve when matched queries are done refetching.
            // We return this Promise so that `mutateAsync` can be used to await refetching.
            return queryClient.invalidateQueries([requestsDefaultQueryKey, { pickupId, partnerId }]);
        },
    });

    const handleRequestRegistrationClick = async () => {
        onRequestRegistration(true);
        const newRequest: ApiRequestPost = {
            pickupId,
            partnerId,
        };
        await addRequestMutation.mutateAsync(newRequest);
        onRequestRegistration(false);
    };

    return (
        <PositiveButton onClick={handleRequestRegistrationClick} fillWidth>
            Meld deg på ekstrauttak
        </PositiveButton>
    );
};
