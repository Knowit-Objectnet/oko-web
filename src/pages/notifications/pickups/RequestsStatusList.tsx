import * as React from 'react';
import styled from 'styled-components';
import { RequestApprovalButton } from './RequestApprovalButton';
import { Roles } from '../../../types';
import { ApiPickUp } from '../../../services/PickUpService';
import { useKeycloak } from '@react-keycloak/web';
import { ApiRequest } from '../../../services/RequestService';
import { useRequests } from '../../../services/hooks/useRequests';
import { useState } from 'react';
import { NegativeStatusBadge, NeutralStatusBadge, PositiveStatusBadge } from '../../../components/StatusBadge';
import { Spinner } from '../../../components/Spinner';

const RequestList = styled.ul`
    display: flex;
    flex-flow: column;
    list-style: none;
    padding-left: 0;
`;

const Request = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    padding: 0.5rem 1rem;

    &:not(:last-child) {
        border-bottom: 0.125rem solid ${(props) => props.theme.colors.White};
    }
`;

const Notice = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
`;

const RequestStatus = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 10rem;
    min-height: 2.5rem;
`;

interface Props {
    pickUp: ApiPickUp;
}

export const RequestsStatusList: React.FC<Props> = ({ pickUp }) => {
    const { keycloak } = useKeycloak();

    const [requestApprovalLoading, setRequestApprovalLoading] = useState(false);

    const { data: requests, isLoading, isError } = useRequests({
        pickupId: pickUp.id,
    });
    const requestsSortedByPartner = (requests ?? []).sort(
        (requestA, requestB) => requestA.partner.id - requestB.partner.id,
    );

    const getStatusForRequest = (request: ApiRequest) => {
        const userCanApproveRequests = keycloak.hasRealmRole(Roles.Ambassador);
        const pickUpIsOpenForRequests = !pickUp.chosenPartner?.id;
        const thisRequestIsApproved = request.partner.id === pickUp.chosenPartner?.id;

        if (requestApprovalLoading) {
            return <Spinner />;
        } else if (pickUpIsOpenForRequests && userCanApproveRequests) {
            return (
                <RequestApprovalButton
                    pickupId={request.pickup.id}
                    partnerId={request.partner.id}
                    onRequestApproval={setRequestApprovalLoading}
                />
            );
        } else if (pickUpIsOpenForRequests) {
            return (
                <NeutralStatusBadge fillWidth size="small">
                    Avventer svar
                </NeutralStatusBadge>
            );
        } else if (thisRequestIsApproved) {
            return (
                <PositiveStatusBadge fillWidth size="small">
                    Godkjent
                </PositiveStatusBadge>
            );
        } else if (!thisRequestIsApproved) {
            return (
                <NegativeStatusBadge fillWidth size="small">
                    Avvist
                </NegativeStatusBadge>
            );
        }
    };

    if (isLoading) {
        return <Spinner />;
    }
    if (isError) {
        return <Notice>Noe gikk galt, kunne ikke laste inn påmeldingsstatus.</Notice>;
    }
    if (requestsSortedByPartner.length === 0) {
        return <Notice>Ingen påmeldte enda</Notice>;
    }

    return (
        <RequestList>
            {requestsSortedByPartner.map((request) => (
                <Request key={`${request.pickup.id}-${request.partner.id}`}>
                    <strong>{request.partner.name}</strong>
                    <RequestStatus>{getStatusForRequest(request)}</RequestStatus>
                </Request>
            ))}
        </RequestList>
    );
};
