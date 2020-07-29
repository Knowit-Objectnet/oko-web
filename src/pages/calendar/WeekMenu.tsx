import * as React from 'react';
import styled from 'styled-components';
import getISOWeek from 'date-fns/getISOWeek';
import ArrowRight from '../../assets/ArrowRight.svg';
import ArrowLeft from '../../assets/ArrowLeft.svg';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const WeekText = styled.div`
    font-weight: bold;
    font-size: 26px;
    line-height: 36px;
    margin: 0px 15px;
`;

interface WeekMenuProps {
    date: Date;
    changeWeek: (delta: -1 | 1) => void;
}

/*
 * Component for selecting weeks
 */
export const WeekMenu: React.FC<WeekMenuProps> = (props) => {
    // Next week button
    const onNextWeek = () => {
        props.changeWeek(1);
    };

    // Previous week button
    const onPreviousWeek = () => {
        props.changeWeek(-1);
    };

    return (
        <Wrapper>
            <ArrowLeft height="2em" onClick={onPreviousWeek} />
            <WeekText>Uke {getISOWeek(props.date)}</WeekText>
            <ArrowRight height="2em" onClick={onNextWeek} />
        </Wrapper>
    );
};
