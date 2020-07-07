import * as React from 'react';
import styled from 'styled-components';
import { Navigation } from './Navigation';
import { SideMenu } from './SideMenu';
import OsloKommuneLogo from '../../assets/Oslo_kommune_logo.svg';
import { Colors } from '../../types';

const StyledHeader = styled.header`
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: space-between;
    background-color: ${Colors.DarkBlue};
`;

const LogoWrapper = styled.div`
    height: 100%;
    margin-right: 115px;
`;

const Logo = styled(OsloKommuneLogo)`
    height: 100%;
`;

/**
 * Header component for the Dashboard
 */
export const Header: React.FC = () => {
    return (
        <StyledHeader>
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <Navigation />
            <SideMenu />
        </StyledHeader>
    );
};
