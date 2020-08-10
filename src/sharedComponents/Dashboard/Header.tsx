import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import { SideMenu } from './SideMenu';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.theme.colors.DarkBlue};
`;

const LogoWrapper = styled(Link)`
    height: 100%;
    margin-right: 115px;

    @media screen and (max-width: 1200px) {
        display: none;
    }
`;

const Logo = styled(OsloKommuneLogo)`
    height: 100%;
`;

interface HeaderProps {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
}

/**
 * Header component for the Dashboard
 */
export const Header: React.FC<HeaderProps> = (props) => {
    return (
        <StyledHeader>
            <LogoWrapper to="/">
                <Logo />
            </LogoWrapper>
            <Navigation />
            <SideMenu isSidebarVisible={props.isSidebarVisible} toggleSidebar={props.toggleSidebar} />
        </StyledHeader>
    );
};
