import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import {ApiPartner, ApiRequest, apiUrl, PickUp} from '../../types';
import { fetcher } from '../../utils/fetcher';
import { Request } from './Request';
import {useEffect, useState} from "react";

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

interface RequestsProps {
    pickupId: number;
    selectedPartnerId?: number;
    isStation: boolean;
    onReject: (partner: ApiPartner, pickupId: number) => void;
    onApprove: (partner: ApiPartner, pickupId: number) => void;
}

export const Requests: React.FC<RequestsProps> = (props) => {
    //
    const { data: apiRequests, isValidating, mutate } = useSWR<Array<ApiRequest>>(
        `${apiUrl}/requests/?pickupId=${props.pickupId}`,
        fetcher,
    );
    const [requests, setRequests] = useState<Array<ApiRequest>>([]);

    useEffect(() => {
        setRequests(apiRequests || []);
    }, [apiRequests]);

    return (
        <Wrapper>
            {requests.length === 0 ? <NoRequests>Ingen påmeldte enda</NoRequests> : null}
            {requests.map((request) => (
                <Request
                    key={`pickupId: ${request.pickup.id} partner ${request.partner.id}`}
                    pickupId={props.pickupId}
                    partner={request.partner}
                    selectedId={props.selectedPartnerId}
                    isStation={props.isStation}
                    onReject={props.onReject}
                    onApprove={props.onApprove}
                />
            ))}
        </Wrapper>
    );
};
