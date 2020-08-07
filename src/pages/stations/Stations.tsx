import * as React from 'react';
import styled from 'styled-components';
import { ApiLocation, apiUrl, Colors, Withdrawal } from '../../types';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
import { useEffect, useState } from 'react';
import { Station } from './Station';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    background-color: ${Colors.White};
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    margin-top: 75px;
`;

export const Stations: React.FC = () => {
    // List of stations
    const { data: apiLocations, isValidating, mutate } = useSWR<Array<ApiLocation>>(`${apiUrl}/stations`, fetcher);
    const locations = apiLocations || [];

    return (
        <Wrapper>
            <Content>
                {locations.map((location) => (
                    <Station key={`LocationId: ${location.id}`} {...location} />
                ))}
            </Content>
        </Wrapper>
    );
};
