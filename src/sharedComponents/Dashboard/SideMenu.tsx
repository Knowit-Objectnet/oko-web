import * as React from 'react';
import styled from 'styled-components';
import Hamburger from '../../assets/Hamburger.svg';
import Cross from '../../assets/Cross.svg';
import Default from '../../assets/Default_profile_pic.svg';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 40px;
`;

const Menu = styled.button`
    display: flex;
    background-color: transparent;
    align-items: center;
    border: 2px solid ${(props) => props.theme.colors.White};
    font-size: 22px;
    line-height: 31px;
    color: ${(props) => props.theme.colors.White};
    padding: 16px;
    margin-right: 45px;
`;

const MenuText = styled.span`
    font-size: 22px;
    line-height: 31px;
    margin-right: 23px;
`;

const StyledCross = styled(Cross)`
    height: 1.5em;
    fill: ${(props) => props.theme.colors.White};
`;

const StyledHamburger = styled(Hamburger)`
    height: 1em;
    fill: ${(props) => props.theme.colors.White};
`;

const UserProfileLink = styled(Link)`
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.colors.White};
`;

const DefaultProfilePicture = styled(Default)`
    width: 50px;
    height: 50px;
    margin-left: 10px;
    fill: ${(props) => props.theme.colors.White};
`;

interface SideMenuProps {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = (props) => (
    <Wrapper>
        <Menu onClick={props.toggleSidebar}>
            <MenuText>Meny</MenuText>
            {props.isSidebarVisible ? <StyledCross /> : <StyledHamburger />}
        </Menu>
        <UserProfileLink to="/minside">
            Min side
            <DefaultProfilePicture />
        </UserProfileLink>
    </Wrapper>
);
