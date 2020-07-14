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

const Time = styled.div`
    background-color: ${Colors.LightBlue};
    margin-right: 2px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 0px 20px;
`;

const Info = styled.div`
    flex 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.LightBlue};
    padding: 0px 15px;
`;

const Name = styled.div`
    flex: 1;
`;

const Toggle = styled.div`
    display: flex;
    align-items: center;
`;

const StyledArrowDown = styled(ArrowDown)`
    height: 2em;
    margin-left: 5px;
`;

const StyledArrowUp = styled(ArrowUp)`
    height: 2em;
    margin-left: 5px;
`;

interface ListItemProps {
    title: string;
    events: Array<EventInfo>;
    date: Date;
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
                {expanded ? null : <Time>{getTimeString(minTime, maxTime)}</Time>}
                <Info>
                    <Name>{props.title}</Name>
                    <Toggle>
                        {expanded ? 'Se mindre' : 'Se stasjonskalender'}
                        {expanded ? (
                            <StyledArrowDown onClick={onExpandClick} />
                        ) : (
                            <StyledArrowUp onClick={onExpandClick} />
                        )}
                    </Toggle>
                </Info>
            </Wrapper>
            {expanded ? <ListItemDropdown date={props.date} min={minTime} max={maxTime} events={props.events} /> : null}
        </div>
    );
};
