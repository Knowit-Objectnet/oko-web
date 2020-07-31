import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import { SideMenu } from './SideMenu';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { Colors } from '../../types';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    background-color: ${Colors.DarkBlue};
`;

const LogoWrapper = styled(Link)`
    height: 100%;
    margin-right: 115px;
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
