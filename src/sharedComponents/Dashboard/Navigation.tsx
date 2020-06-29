import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { NavElement } from './NavElement';
import { useKeycloak } from '@react-keycloak/web';

const Nav = styled.nav`
    display: flex;
    height: 44px;
    background-color: #afafaf;
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
            {keycloak.hasRealmRole('Oslo') ? (
                <NavElement
                    text={'Oversikt'}
                    location={'/'}
                    selected={history.location.pathname.slice(1) === ''}
                    onClick={onClick}
                />
            ) : null}
            <NavElement
                text={'Kalender'}
                location={'/calendar'}
                selected={history.location.pathname.slice(1) === 'calendar'}
                onClick={onClick}
            />
            <NavElement
                text={'Sam. partnere'}
                location={'partners'}
                selected={history.location.pathname.slice(1) === 'partners'}
                onClick={onClick}
            />
            <NavElement
                text={'Rapportering'}
                location={'reporting'}
                selected={history.location.pathname.slice(1) === 'reporting'}
                onClick={onClick}
            />
            <NavElement
                text={'Avvik'}
                location={'deviations'}
                selected={history.location.pathname.slice(1) === 'deviations'}
                onClick={onClick}
            />
            {keycloak.hasRealmRole('Partner') || keycloak.hasRealmRole('Ambassador') ? (
                <>
                    <NavElement
                        text={'Historikk'}
                        location={'/history'}
                        selected={history.location.pathname.slice(1) === 'history'}
                        onClick={onClick}
                    />
                    <NavElement
                        text={'Info fra Oslo kommune'}
                        location={'info'}
                        selected={history.location.pathname.slice(1) === 'info'}
                        onClick={onClick}
                    />
                </>
            ) : null}
        </Nav>
    );
};
