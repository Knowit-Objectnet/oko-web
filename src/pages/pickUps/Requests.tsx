import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { ApiRequest, apiUrl } from '../../types';
import { fetcher } from '../../utils/fetcher';
import { Request } from './Request';
import { useEffect, useState } from 'react';

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

interface Props {
    pickupId: number;
    selectedPartnerId?: number;
    isStation: boolean;
}

export const Requests: React.FC<Props> = (props) => {
    const { data: requests, isValidating } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${props.pickupId}`,
        fetcher,
    );

    return (
        <Wrapper>
            {!requests && isValidating && <NoRequests>Laster inn...</NoRequests>}
            {requests && requests.length === 0 && <NoRequests>Ingen påmeldte enda</NoRequests>}
            {requests?.map((request) => (
                <Request
                    key={`pickupId: ${request.pickup.id} partner ${request.partner.id}`}
                    pickupId={props.pickupId}
                    partner={request.partner}
                    selectedId={props.selectedPartnerId}
                    isStation={props.isStation}
                />
            ))}
        </Wrapper>
    );
};
