import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { NavElement } from './NavElement';

const Nav = styled.nav`
    display: flex;
    height: 44px;
    background-color: #afafaf;
`;

export const Navigation: React.FC<unknown> = () => {
    const history = useHistory();

    const onClick = (location: string) => {
        history.push(location);
    };

    return (
        <Nav>
            <NavElement
                text={'Kalender'}
                location={'/calendar'}
                selected={history.location.pathname.slice(1) === 'calendar'}
                onClick={onClick}
            />
            <NavElement
                text={'Historikk'}
                location={'/history'}
                selected={history.location.pathname.slice(1) === 'history'}
                onClick={onClick}
            />
            <NavElement
                text={'Sam. partnere'}
                location={'partners'}
                selected={history.location.pathname.slice(1) === 'partners'}
                onClick={onClick}
            />
            <NavElement
                text={'Info fra Oslo kommune'}
                location={'info'}
                selected={history.location.pathname.slice(1) === 'info'}
                onClick={onClick}
            />
        </Nav>
    );
};
