import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPickUp } from '../../../api/PickUpService';
import { useRequests } from '../../../api/hooks/useRequests';
import { RequestRegistrationButton } from './RequestRegistrationButton';
import { RequestCancellationButton } from './RequestCancellationButton';
import { useState } from 'react';
import { NegativeStatusBadge, NeutralStatusBadge, PositiveStatusBadge } from '../../../sharedComponents/StatusBadge';
import { Spinner } from '../../../sharedComponents/Spinner';

const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    padding: 0.625rem;
    min-height: 4.25rem;

    & > *:not(:last-child) {
        margin-right: 0.625rem;
    }
`;

const Notice = styled.span`
    font-style: italic;
    font-size: 0.875rem;
`;

interface Props {
    pickUp: ApiPickUp;
}

export const PartnerRequestStatus: React.FC<Props> = ({ pickUp }) => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.GroupID;

    const [requestStatusLoading, setRequestStatusLoading] = useState(false);

    const { data: request, isLoading: requestLoading, isError: requestLoadingError } = useRequests({
        pickupId: pickUp.id,
        partnerId: userId,
    });

    const renderRequestStatus = () => {
        if (requestLoading || requestStatusLoading) {
            return <Spinner />;
        }

        if (requestLoadingError) {
            return <Notice>Noe gikk galt, kunne ikke hente påmeldingsstatus.</Notice>;
        }

        const userHasRequest = request?.[0] ? true : false;
        const pickUpIsOpenForRequest = !pickUp.chosenPartner;

        const userCanMakeRequest = pickUpIsOpenForRequest && !userHasRequest;
        const userRequestAwaiting = pickUpIsOpenForRequest && userHasRequest;
        const userRequestApproved = pickUp.chosenPartner?.id === userId;
        // TODO: explicit rejection of a partner request is not supported by backend yet.
        //  When implemented, the following condition needs to be rewritten.
        const userRequestRejected = userHasRequest && !userRequestApproved;

        if (userCanMakeRequest) {
            return (
                <RequestRegistrationButton
                    pickupId={pickUp.id}
                    partnerId={userId}
                    onRequestRegistration={setRequestStatusLoading}
                />
            );
        } else if (userRequestAwaiting) {
            return (
                <>
                    <NeutralStatusBadge fillWidth>Avventer svar</NeutralStatusBadge>
                    <RequestCancellationButton
                        pickupId={pickUp.id}
                        partnerId={userId}
                        onRequestCancellation={setRequestStatusLoading}
                    />
                </>
            );
        } else if (userRequestApproved) {
            return <PositiveStatusBadge fillWidth>Forespørsel godkjent</PositiveStatusBadge>;
        } else if (userRequestRejected) {
            return <NegativeStatusBadge fillWidth>Forespørsel avvist</NegativeStatusBadge>;
        }
        return <NegativeStatusBadge fillWidth>Påmelding stengt</NegativeStatusBadge>;
    };

    return <StatusWrapper>{renderRequestStatus()}</StatusWrapper>;
};
