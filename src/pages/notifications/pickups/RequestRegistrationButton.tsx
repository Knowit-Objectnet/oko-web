import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { useMutation, useQueryClient } from 'react-query';
import { ApiRequestPost, postRequest, requestsDefaultQueryKey } from '../../../api/RequestService';
import { PositiveButton } from '../../../sharedComponents/buttons/PositiveButton';

interface Props {
    pickupId: number;
    partnerId: number;
    onRequestRegistration: (isLoading: boolean) => void;
}

export const RequestRegistrationButton: React.FC<Props> = ({ pickupId, partnerId, onRequestRegistration }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const queryClient = useQueryClient();
    const addRequestMutation = useMutation((newRequest: ApiRequestPost) => postRequest(newRequest, keycloak.token), {
        onError: () => {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        },
        onSettled: () => {
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
