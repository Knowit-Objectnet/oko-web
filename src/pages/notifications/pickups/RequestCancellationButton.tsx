import * as React from 'react';
import { types, useAlert } from 'react-alert';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiRequestParams, deleteRequest, requestsDefaultQueryKey } from '../../../api/RequestService';
import Cross from '../../../assets/Cross.svg';
import styled from 'styled-components';

const CancelButton = styled.button`
    display: flex;
    font-weight: bold;
    align-items: center;
    border: none;
    background: none;
    min-height: 45px;
    font-size: 0.875rem;

    & > svg {
        margin-right: 2px;
        height: 1.5rem;
    }
`;

interface Props {
    pickupId: number;
    partnerId: number;
}

export const RequestCancellationButton: React.FC<Props> = ({ pickupId, partnerId }) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    const [deleteRequestMutation, { isLoading: deleteRequestLoading }] = useMutation(
        (request: ApiRequestParams) => deleteRequest(request, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Påmelding til ekstrauttak ble slettet suksessfullt.', { type: types.SUCCESS });
            },
            onError: () => {
                alert.show('Noe gikk galt, sletting av påmelding til ekstrauttaket ble ikke registrert.', {
                    type: types.ERROR,
                });
            },
            onSettled: () => {
                queryCache.invalidateQueries(requestsDefaultQueryKey);
            },
        },
    );

    const handleRequestCancellationClick = () => {
        const requestToCancel: ApiRequestParams = {
            pickupId,
            partnerId,
        };
        deleteRequestMutation(requestToCancel);
    };

    return (
        <CancelButton onClick={handleRequestCancellationClick} disabled={deleteRequestLoading}>
            <Cross /> Meld av
        </CancelButton>
    );
};
