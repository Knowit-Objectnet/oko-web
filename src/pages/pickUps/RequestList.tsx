import * as React from 'react';
import styled from 'styled-components';
import { ApiPickup } from '../../types';
import { RequestApprovalForm } from './RequestApprovalForm';
import { useRequests } from '../../services/useRequests';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const NoRequests = styled.div`
    font-style: italic;
    font-size: 12px;
    line-height: 17px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const RequestList: React.FC<{ pickup: ApiPickup }> = ({ pickup }) => {
    const { data: requests, isValidating } = useRequests({ pickupId: pickup.id });

    return (
        <Wrapper>
            {!requests && isValidating && <NoRequests>Laster inn...</NoRequests>}
            {requests && requests.length === 0 && <NoRequests>Ingen påmeldte enda</NoRequests>}
            {(requests ?? []).map((request) => (
                <RequestApprovalForm
                    key={`${request.pickup.id}-${request.partner.id}`}
                    pickup={pickup}
                    request={request}
                />
            ))}
        </Wrapper>
    );
};
