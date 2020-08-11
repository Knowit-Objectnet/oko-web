import * as React from 'react';
import styled from 'styled-components';
import { ApiLocation } from '../../types';
import Pencil from '../../assets/Pencil.svg';
import { StationAddress } from './StationAddress';
import { StationOpeningTimes } from './StationOpeningTimes';
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
    margin-top: 0px;
    margin-bottom: 11px;
`;

const Info = styled.div`
    display: flex;
    width: 100%;
`;

const Icon = styled.div`
    margin-left: 10px;
    background-color: ${(props) => props.theme.colors.Blue};
    border-radius: 50%;
    height: 27px;
    width: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledPencil = styled(Pencil)`
    height: 1em;
`;

export const Station: React.FC<ApiLocation> = (props) => {
    return (
        <Wrapper>
            <Header>
                <Title>{props.name}</Title>
                {/*
                    <Icon>
                        <StyledPencil />
                    </Icon>
                */}
            </Header>
            <Info>
                <StationAddress address="N/A" />
                <StationOpeningTimes openingTimes={props.days} />
                <StationAmbassador name="N/A" email="N/A" phone="N/A" title="N/A" />
            </Info>
        </Wrapper>
    );
};
