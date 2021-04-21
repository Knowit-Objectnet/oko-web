import * as React from 'react';
import styled from 'styled-components';
import Clock from '../../assets/Clock.svg';
import { Dropdown } from './Dropdown';
import { StationOpeningHours } from '../../services/StationService';

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

interface Props {
    openingTimes: StationOpeningHours;
}

export const StationOpeningTimes: React.FC<Props> = (props) => {
    const getList: () => [Array<React.ReactElement>, number] = () => {
        const list: Array<React.ReactElement> = [];
        const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        let selectedIndex = 0;
        for (const [key, value] of Object.entries(props.openingTimes)) {
            if (value) {
                if (days[new Date().getDay() - 1] == key) {
                    selectedIndex = new Date().getDay() - 1;
                    list.push(
                        <React.Fragment key={key}>
                            <strong>{`${key.toLowerCase()}: `}</strong>
                            {`${value[0].slice(0, 5)} - ${value[1].slice(0, 5)}`}
                        </React.Fragment>,
                    );
                    continue;
                }
                list.push(
                    <React.Fragment key={key}>
                        {`${key.toLowerCase()}: `}
                        {`${value[0].slice(0, 5)} - ${value[1].slice(0, 5)}`}
                    </React.Fragment>,
                );
            }
        }
        return [list, selectedIndex];
    };

    const [list, index] = getList();

    return (
        <Wrapper>
            <Title>Åpningstider:</Title>
            <Info>
                <StyledClock />
                <Dropdown list={list} selectedIndex={index} />
            </Info>
        </Wrapper>
    );
};
