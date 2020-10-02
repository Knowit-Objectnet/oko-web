import * as React from 'react';
import styled from 'styled-components';
import { Station } from '../../types';
import { StationAddress } from './StationAddress';
import { StationOpeningHoursInfo } from './StationOpeningHoursInfo';
import { StationAmbassador } from './StationAmbassador';

const Wrapper = styled.div`
    width: 100%;

    &:not(:last-child) {
        margin-bottom: 55px;
    }
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Title = styled.h3`
    margin-top: 0;
    margin-bottom: 11px;
`;

const Info = styled.div`
    display: flex;
    width: 100%;
`;

export const StationInfo: React.FC<Station> = (props) => {
    return (
        <Wrapper>
            <Header>
                <Title>{props.name}</Title>
            </Header>
            <Info>
                <StationAddress address="N/A" />
                <StationOpeningHoursInfo openingHours={props.hours} />
                <StationAmbassador name="N/A" email="N/A" phone="N/A" title="N/A" />
            </Info>
        </Wrapper>
    );
};
