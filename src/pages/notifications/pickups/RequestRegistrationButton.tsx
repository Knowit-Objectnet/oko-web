import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiRequestPost, postRequest, requestsDefaultQueryKey } from '../../../api/RequestService';
import { useState } from 'react';
import { PositiveButton } from '../../../sharedComponents/buttons/PositiveButton';

interface Props {
    pickupId: number;
    partnerId: number;
}

export const RequestRegistrationButton: React.FC<Props> = ({ pickupId, partnerId }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();
    const [addRequestLoading, setAddRequestLoading] = useState(false);

    const [addRequestMutation] = useMutation((newRequest: ApiRequestPost) => postRequest(newRequest, keycloak.token), {
        onMutate: () => setAddRequestLoading(true),
        onError: () => {
            setAddRequestLoading(false);
            alert.show('Noe gikk galt, påmelding til ekstrauttaket ble ikke registrert.', { type: types.ERROR });
        },
        onSettled: () => queryCache.invalidateQueries([requestsDefaultQueryKey, { pickupId, partnerId }]),
    });

    const handleRequestRegistrationClick = () => {
        const newRequest: ApiRequestPost = {
            pickupId,
            partnerId,
        };
        addRequestMutation(newRequest);
    };

    return (
        <PositiveButton onClick={handleRequestRegistrationClick} isLoading={addRequestLoading}>
            Meld deg på ekstrauttak
        </PositiveButton>
    );
};
