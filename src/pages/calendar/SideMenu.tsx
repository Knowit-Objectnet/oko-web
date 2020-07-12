import * as React from 'react';
import styled from 'styled-components';
import Calendar from '../../assets/Calendar.svg';
import Plus from '../../assets/Plus.svg';
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`;

const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${Colors.Green};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(last-child) {
        margin-bottom: 30px;
    }
`;

interface SideMenuProps {
    onCalendarToggleClick: () => void;
    onNewEventClick: () => void;
    showCalendarToggle?: boolean;
    showNewEventButton?: boolean;
}

/**
 * Component that lets a user choose which location (ombruksstasjon) they want to view events from
 */
export const SideMenu: React.FC<SideMenuProps> = (props) => {
    // On change function for radio buttons
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
    };

    return (
        <Wrapper>
            {props.showCalendarToggle ? (
                <Button onClick={props.onCalendarToggleClick}>
                    <Calendar height="100%" />
                </Button>
            ) : null}
            {props.showNewEventButton ? (
                <Button onClick={props.onNewEventClick}>
                    <Plus height="100%" />
                </Button>
            ) : null}
        </Wrapper>
    );
};
