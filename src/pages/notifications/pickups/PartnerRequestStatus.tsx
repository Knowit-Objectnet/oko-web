import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import { ApiPickUp } from '../../../api/PickUpService';
import { useRequests } from '../../../api/hooks/useRequests';
import { RequestRegistrationButton } from './RequestRegistrationButton';
import { RequestCancellationButton } from './RequestCancellationButton';

const StatusWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.625rem;

    & > *:not(:last-child) {
        margin-right: 0.625rem;
    }
`;

const Status = styled.div`
    font-weight: bold;
    font-size: 0.875rem;
    min-height: 3rem;
    text-align: center;
    padding: 0.75rem 1rem;
    background: ${(props) => props.theme.colors.White};
    min-width: 12rem;
    border: 0.125rem solid;
`;

const AwaitingStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Blue};
`;

const ApprovedStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Green};
`;

const RejectStatus = styled(Status)`
    border-color: ${(props) => props.theme.colors.Red};
`;

const Fetching = styled.span`
    font-style: italic;
    font-size: 0.875rem;
`;

interface Props {
    pickUp: ApiPickUp;
}

export const PartnerRequestStatus: React.FC<Props> = ({ pickUp }) => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.GroupID;

    const { data: request, isLoading, isError } = useRequests({
        pickupId: pickUp.id,
        partnerId: userId,
    });

    const renderRequestStatus = () => {
        if (isLoading) {
            return <Fetching>Laster inn...</Fetching>;
        }

        if (isError) {
            return <Fetching>Noe gikk galt, kunne ikke hente påmeldingsstatus.</Fetching>;
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
            return <RequestRegistrationButton pickupId={pickUp.id} partnerId={userId} />;
        } else if (userRequestAwaiting) {
            return (
                <>
                    <AwaitingStatus>Avventer svar</AwaitingStatus>
                    <RequestCancellationButton pickupId={pickUp.id} partnerId={userId} />
                </>
            );
        } else if (userRequestApproved) {
            return <ApprovedStatus>Forespørsel godkjent</ApprovedStatus>;
        } else if (userRequestRejected) {
            return <RejectStatus>Forespørsel avvist</RejectStatus>;
        }
        return <RejectStatus>Påmelding stengt</RejectStatus>;
    };

    return <StatusWrapper>{renderRequestStatus()}</StatusWrapper>;
};
