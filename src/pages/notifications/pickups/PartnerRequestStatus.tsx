import * as React from 'react';
import styled from 'styled-components';
import { ApiPickUp } from '../../../services/deprecated/PickUpService';
import { useRequests } from '../../../services/deprecated/hooks/useRequests';
import { RequestRegistrationButton } from './RequestRegistrationButton';
import { RequestCancellationButton } from './RequestCancellationButton';
import { useState } from 'react';
import { NegativeStatusBadge, NeutralStatusBadge, PositiveStatusBadge } from '../../../components/StatusBadge';
import { Spinner } from '../../../components/Spinner';
import { useAuth } from '../../../auth/useAuth';

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
    const { user } = useAuth();

    const [requestStatusLoading, setRequestStatusLoading] = useState(false);

    const { data: request, isLoading: requestLoading, isError: requestLoadingError } = useRequests({
        pickupId: pickUp.id,
        partnerId: user.aktorId,
    });

    const renderRequestStatus = () => {
        if (requestLoading || requestStatusLoading) {
            return <Spinner />;
        }

        if (requestLoadingError) {
            return <Notice>Noe gikk galt, kunne ikke hente påmeldingsstatus.</Notice>;
        }

        const userHasRequest = !!request?.[0];
        const pickUpIsOpenForRequest = !pickUp.chosenPartner;

        const userCanMakeRequest = pickUpIsOpenForRequest && !userHasRequest;
        const userRequestAwaiting = pickUpIsOpenForRequest && userHasRequest;
        const userRequestApproved = pickUp.chosenPartner?.id === user.aktorId;
        // TODO: explicit rejection of a partner request is not supported by backend yet.
        //  When implemented, the following condition needs to be rewritten.
        const userRequestRejected = userHasRequest && !userRequestApproved;

        if (userCanMakeRequest) {
            return <RequestRegistrationButton pickupId={pickUp.id} onRequestRegistration={setRequestStatusLoading} />;
        } else if (userRequestAwaiting) {
            return (
                <>
                    <NeutralStatusBadge fillWidth>Avventer svar</NeutralStatusBadge>
                    <RequestCancellationButton pickupId={pickUp.id} onRequestCancellation={setRequestStatusLoading} />
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
