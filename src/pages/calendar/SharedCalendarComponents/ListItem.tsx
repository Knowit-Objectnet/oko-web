import * as React from 'react';
import styled from 'styled-components';
import { Colors, EventInfo } from '../../../types';
import ArrowUp from '../../../assets/ArrowUp.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';
import { useState } from 'react';
import { ListItemDropdown } from './ListItemDropdown';

interface WrapperProps {
    expanded: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    width: 100%;
    height: 45px;
    display: flex;

    &:not(last-child) {
        margin-bottom: ${(props) => (props.expanded ? 0 : '2px')};
    }
`;

interface Color {
    color: Colors;
}

const getTextColor = (color: Colors) => {
    if (color === Colors.DarkBlue || color === Colors.DarkBegie || color === Colors.DarkGreen) {
        return Colors.White;
    } else {
        return Colors.Black;
    }
};

const Time = styled.div<Color>`
    background-color: ${(props) => props.color};
    color: ${(props) => getTextColor(props.color)};
    margin-right: 2px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 0px 20px;
`;

const Info = styled.div<Color>`
    background-color: ${(props) => props.color};
    color: ${(props) => getTextColor(props.color)};
    flex 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 15px;
`;

const Name = styled.div`
    flex: 1;
`;

const Toggle = styled.div`
    display: flex;
    align-items: center;
`;

const StyledArrowDown = styled(ArrowDown)<Color>`
    height: 2em;
    margin-left: 5px;
    fill: ${(props) => getTextColor(props.color)};
`;

const StyledArrowUp = styled(ArrowUp)<Color>`
    height: 2em;
    margin-left: 5px;
    fill: ${(props) => getTextColor(props.color)};
`;

interface ListItemProps {
    title: string;
    events: Array<EventInfo>;
    date: Date;
    color: Colors;
}

export const ListItem: React.FC<ListItemProps> = (props) => {
    const [expanded, setExpanded] = useState(false);

    const minTime = new Date(Math.min(...props.events.map((event) => event.start.getTime())));
    const maxTime = new Date(Math.max(...props.events.map((event) => event.end.getTime())));

    const getTimeString = (start: Date, end: Date) => {
        const startString =
            start.getHours().toString().padStart(2, '0') + ':' + start.getMinutes().toString().padStart(2, '0');
        const endString =
            end.getHours().toString().padStart(2, '0') + ':' + end.getMinutes().toString().padStart(2, '0');

        return startString + ' - ' + endString;
    };

    const onExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Wrapper expanded={expanded}>
                {expanded ? null : <Time color={props.color}>{getTimeString(minTime, maxTime)}</Time>}
                <Info color={props.color}>
                    <Name>{props.title}</Name>
                    <Toggle>
                        {expanded ? 'Se mindre' : 'Se stasjonskalender'}
                        {expanded ? (
                            <StyledArrowDown color={props.color} onClick={onExpandClick} />
                        ) : (
                            <StyledArrowUp color={props.color} onClick={onExpandClick} />
                        )}
                    </Toggle>
                </Info>
            </Wrapper>
            {expanded ? (
                <ListItemDropdown
                    date={props.date}
                    min={minTime}
                    max={maxTime}
                    events={props.events}
                    color={props.color}
                />
            ) : null}
        </div>
    );
};
