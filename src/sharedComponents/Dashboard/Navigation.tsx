import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import { NavElement } from './NavElement';
import List from '../../assets/List.svg';
import Calendar from '../../assets/Calendar.svg';
import Weight from '../../assets/Weight.svg';
import Bell from '../../assets/Bell.svg';
import { Roles } from '../../types';

const Nav = styled.nav`
    display: flex;
    flex: 1;

    @media screen and (max-width: 1100px) {
        display: none;
    }
`;

/**
 * Navigation bar for the header
 */
export const Navigation: React.FC = () => {
    // Keycloak instance
    const { keycloak } = useKeycloak();

    const history = useHistory();

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
                        icon={Bell}
                        location={'/statistics'}
                        selected={history.location.pathname.slice(1) === 'statistics'}
                        onClick={onClick}
                    />
                    <NavElement
                        text={'Samarbeidspartnere'}
                        icon={Bell}
                        location={'/partners'}
                        selected={history.location.pathname.slice(1) === 'partners'}
                        onClick={onClick}
                    />
                </>
            ) : null}
            {keycloak.hasRealmRole(Roles.Partner) || keycloak.hasRealmRole(Roles.Ambassador) ? (
                <>
                    <NavElement
                        text={'Vektuttak'}
                        icon={Weight}
                        location={'reporting'}
                        selected={history.location.pathname.slice(1) === 'reporting'}
                        onClick={onClick}
                    />
                    <NavElement
                        text={'Historikk'}
                        icon={Weight}
                        location={'/history'}
                        selected={history.location.pathname.slice(1) === 'history'}
                        onClick={onClick}
                    />
                    <NavElement
                        text={'Info fra Oslo kommune'}
                        icon={Weight}
                        location={'info'}
                        selected={history.location.pathname.slice(1) === 'info'}
                        onClick={onClick}
                    />
                </>
            ) : null}
        </Nav>
    );
};
