import * as React from 'react';
import styled from 'styled-components';
import Clock from '../../assets/Clock.svg';
import { ApiLocation, LocationOpeningTimes } from '../../types';
import { Dropdown } from '../../sharedComponents/Dropdown';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 2px;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 15px;
    margin-bottom: 10px;
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 15px;
    box-sizing: border-box;
    flex: 1;
`;

const StyledClock = styled(Clock)`
    height: 1.5em;
    margin-right: 10px;
`;

interface StationOpeningTimesProps {
    openingTimes: LocationOpeningTimes;
}

export const StationOpeningTimes: React.FC<StationOpeningTimesProps> = (props) => {
    const getList: () => Array<string> = () => {
        const list: Array<string> = [];
        for (const times in props.openingTimes) {
            list.push(times[0].slice(0, 5));
        }
        return list;
    };

    return (
        <Wrapper>
            <Title>Åpningstider:</Title>
            <Info>
                <StyledClock />
                <Dropdown list={getList()} />
            </Info>
        </Wrapper>
    );
};
