import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { NavElement } from './NavElement';
import List from '../../assets/List.svg';
import Calendar from '../../assets/Calendar.svg';
import Weight from '../../assets/Weight.svg';
import Bell from '../../assets/Bell.svg';
import Chart from '../../assets/Chart.svg';
import { Roles } from '../../types';

const Nav = styled.nav`
    display: flex;
    flex: 1;

    @media screen and (max-width: 1200px) {
        margin-left: 20px;
    }
`;

/**
 * Navigation bar for the header
 */
export const Navigation: React.FC = () => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // History instance
    const history = useHistory();
    // On click function for the navigation elements to change location
    const onClick = (location: string) => {
        history.push(location);
    };

    return (
        <Nav>
            {keycloak.hasRealmRole(Roles.Oslo) ? (
                <NavElement
                    text={'Oversikt'}
                    icon={List}
                    location={'/'}
                    selected={history.location.pathname.slice(1) === ''}
                    onClick={onClick}
                />
            ) : null}
            <NavElement
                text={'Kalender'}
                icon={Calendar}
                location={'/calendar'}
                selected={history.location.pathname.slice(1) === 'calendar'}
                onClick={onClick}
            />
            {keycloak.hasRealmRole(Roles.Oslo) ? (
                <>
                    <NavElement
                        text={'Statistikk'}
                        icon={Chart}
                        location={'/statistics'}
                        selected={history.location.pathname.slice(1) === 'statistics'}
                        onClick={onClick}
                    />
                </>
            ) : null}
            {keycloak.hasRealmRole(Roles.Partner) ? (
                <NavElement
                    text={'Vektuttak'}
                    icon={Weight}
                    location={'/reporting'}
                    selected={history.location.pathname.slice(1) === 'reporting'}
                    onClick={onClick}
                />
            ) : null}
            {keycloak.hasRealmRole(Roles.Partner) || keycloak.hasRealmRole(Roles.Ambassador) ? (
                <NavElement
                    text={'Varsler'}
                    icon={Bell}
                    location={'/notifications'}
                    selected={history.location.pathname.slice(1) === 'notifications'}
                    onClick={onClick}
                />
            ) : null}
        </Nav>
    );
};
