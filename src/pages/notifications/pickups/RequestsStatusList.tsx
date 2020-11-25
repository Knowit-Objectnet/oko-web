import * as React from 'react';
import styled from 'styled-components';
import { RequestApprovalButton } from './RequestApprovalButton';
import { Roles } from '../../../types';
import { ApiPickUp } from '../../../api/PickUpService';
import { useKeycloak } from '@react-keycloak/web';
import { ApiRequest } from '../../../api/RequestService';
import { useRequests } from '../../../api/hooks/useRequests';
import { useState } from 'react';
import DotsSpinner from '../../../assets/DotsSpinner.svg';

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
    height: 100%;
    font-style: italic;
    font-size: 0.875rem;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
`;

const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 10rem;
    min-height: 2.5rem;
`;

const Status = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 0.875rem;
    background: ${(props) => props.theme.colors.White};
    border: 0.125rem solid;
    padding: 0.5rem 1rem;
    width: 100%;
`;

const ApprovedStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Green};
`;
const RejectedStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Red};
`;
const AwaitingStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Blue};
`;

const LoadingSpinner = styled(DotsSpinner)`
    height: 0.375rem;
    width: auto;
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
            return <LoadingSpinner />;
        } else if (pickUpIsOpenForRequests && userCanApproveRequests) {
            return (
                <RequestApprovalButton
                    pickupId={request.pickup.id}
                    partnerId={request.partner.id}
                    onRequestApproval={setRequestApprovalLoading}
                />
            );
        } else if (pickUpIsOpenForRequests) {
            return <AwaitingStatus>Avventer svar</AwaitingStatus>;
        } else if (thisRequestIsApproved) {
            return <ApprovedStatus>Godkjent</ApprovedStatus>;
        } else if (!thisRequestIsApproved) {
            return <RejectedStatus>Avvist</RejectedStatus>;
        }
    };

    if (isLoading) {
        return <Notice>Laster inn...</Notice>;
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
                    <StatusWrapper>{getStatusForRequest(request)}</StatusWrapper>
                </Request>
            ))}
        </RequestList>
    );
};
