import * as React from 'react';
import styled from 'styled-components';
import { StationAddress } from './StationAddress';
import { StationOpeningTimes } from './StationOpeningTimes';
import { StationAmbassador } from './StationAmbassador';
import { ApiStation } from '../../services/StationService';
import { ApiStasjon } from '../../services-currentapi/AktorService';

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

interface Props {
    station: ApiStasjon;
}

export const Station: React.FC<Props> = ({ station }) => {
    return (
        <Wrapper>
            <Header>
                <Title>{station.navn}</Title>
            </Header>
            <Info>
                <StationAddress address="N/A" />
                {/* <StationOpeningTimes openingTimes={station.hours} /> */}
                <StationAmbassador name="N/A" email="N/A" phone="N/A" title="N/A" />
            </Info>
        </Wrapper>
    );
};
