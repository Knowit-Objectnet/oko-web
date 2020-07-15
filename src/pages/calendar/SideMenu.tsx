import * as React from 'react';
import styled from 'styled-components';
import Calendar from '../../assets/Calendar.svg';
import Plus from '../../assets/Plus.svg';
import { Colors, Roles } from '../../types';
import { useKeycloak } from '@react-keycloak/web';

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

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

interface SideMenuProps {
    onCalendarToggleClick: () => void;
    onNewEventClick: () => void;
    onExtraEventClick: () => void;
}

/**
 * Component that lets a user either create a new event (if REG) or toggle between agenda and calendar (if
 * ambassador or partner)
 */
export const SideMenu: React.FC<SideMenuProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    // On NewEvent or ExtraEvent button click
    // Fire prop function depending on role
    const onNewOrExtraEventClick = () => {
        if (keycloak.hasRealmRole(Roles.Ambassador)) {
            props.onExtraEventClick();
        } else {
            props.onNewEventClick();
        }
    };

    return (
        <Wrapper>
            {keycloak.hasRealmRole(Roles.Partner) || keycloak.hasRealmRole(Roles.Ambassador) ? (
                <Button onClick={props.onCalendarToggleClick}>
                    <Calendar height="100%" />
                </Button>
            ) : null}
            {keycloak.hasRealmRole(Roles.Oslo) || keycloak.hasRealmRole(Roles.Ambassador) ? (
                <Button onClick={onNewOrExtraEventClick}>
                    <Plus height="100%" />
                </Button>
            ) : null}
        </Wrapper>
    );
};
