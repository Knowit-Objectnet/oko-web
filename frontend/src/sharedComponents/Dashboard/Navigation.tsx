import * as React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { NavElement } from './NavElement';

const Nav = styled.nav`
    display: flex;
    height: 44px;
    background-color: #afafaf;
`;

export const Navigation: React.FC<{}> = () => {
    const history = useHistory();

    const onClick = (location: string) => {
        history.push(location);
    };

    return (
        <Nav>
            <NavElement
                text={'Kalender'}
                location={history.location.pathname.slice(1)}
                selected={history.location.pathname.slice(1) === 'calendar'}
                onClick={onClick}
            />
            <NavElement
                text={'Historikk'}
                location={history.location.pathname.slice(1)}
                selected={history.location.pathname.slice(1) === 'history'}
                onClick={onClick}
            />
            <NavElement
                text={'Sam. partnere'}
                location={history.location.pathname.slice(1)}
                selected={history.location.pathname.slice(1) === 'partners'}
                onClick={onClick}
            />
            <NavElement
                text={'Info fra Oslo kommune'}
                location={history.location.pathname.slice(1)}
                selected={history.location.pathname.slice(1) === 'info'}
                onClick={onClick}
            />
        </Nav>
    );
};
