import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
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

    const [addRequestMutation] = useMutation((newRequest: ApiRequestPost) => postRequest(newRequest, keycloak.token), {
        onSuccess: () => queryCache.invalidateQueries([requestsDefaultQueryKey, { pickupId, partnerId }]),
        onError: () => {
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        },
    });

    const handleRequestRegistrationClick = async () => {
        onRequestRegistration(true);
        const newRequest: ApiRequestPost = {
            pickupId,
            partnerId,
        };
        await addRequestMutation(newRequest);
        onRequestRegistration(false);
    };

    return <PositiveButton onClick={handleRequestRegistrationClick}>Meld deg på ekstrauttak</PositiveButton>;
};
