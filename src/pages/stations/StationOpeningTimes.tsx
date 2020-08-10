import * as React from 'react';
import styled from 'styled-components';
import Clock from '../../assets/Clock.svg';

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
    start: string;
    end: string;
}

export const StationOpeningTimes: React.FC<StationOpeningTimesProps> = (props) => {
    const date = new Date();
    const startTimeArr = props.start.split(':');
    const startTime = new Date(date.setHours(parseInt(startTimeArr[0]), parseInt(startTimeArr[1]), 0, 0));
    const endTimeArr = props.end.split(':');
    const endTime = new Date(date.setHours(parseInt(endTimeArr[0]), parseInt(endTimeArr[1]), 0, 0));

    return (
        <Wrapper>
            <Title>Åpningstider:</Title>
            <Info>
                <StyledClock />
                {`${startTime.getHours().toString().padStart(2, '0')}:${startTime
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')} - ${endTime
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`}
            </Info>
        </Wrapper>
    );
};
