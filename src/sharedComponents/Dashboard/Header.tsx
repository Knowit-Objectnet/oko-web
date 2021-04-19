import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.colors.DarkBlue};
    padding-right: 40px;
`;

const HomeLink = styled(Link)`
    height: 100%;
    margin-right: 115px;
`;

const Logo = styled(OsloKommuneLogo)`
    height: 100%;
`;

const LogoutLink = styled(Link)`
    padding: 16px;
    font-size: 20px;
    font-weight: normal;
    min-height: 3rem;
    border: 2px solid ${(props) => props.theme.colors.White};
    color: ${(props) => props.theme.colors.White};
`;

export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <HomeLink to="/">
                <Logo />
            </HomeLink>
            <Navigation />
            <LogoutLink to="/loggut">Logg ut</LogoutLink>
        </StyledHeader>
    );
};
