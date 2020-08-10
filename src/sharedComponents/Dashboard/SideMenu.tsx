import * as React from 'react';
import styled from 'styled-components';
import Hamburger from '../../assets/Hamburger.svg';
import Cross from '../../assets/Cross.svg';
import Default from '../../assets/Default_profile_pic.svg';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory, Link } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 40px;
`;

const Menu = styled.div`
    display: flex;
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

const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MyLink = styled(Link)`
    font-size: 22px;
    line-height: 31px;
    margin-right: 10px;
    color: ${(props) => props.theme.colors.White};
`;

const ProfilePicture = styled.img``;

const DefaultProfilePicture = styled(Default)`
    width: 50px;
    height: 50px;
    fill: ${(props) => props.theme.colors.White};
`;

interface SideMenuProps {
    isSidebarVisible: boolean;
    toggleSidebar: () => void;
}

/**
 * Side menu for quick-naviagtion and user icon
 */
export const SideMenu: React.FC<SideMenuProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // History instance
    const history = useHistory();
    // Profile picture url. Empty for now as there is no way to get a profile picture
    const profilePicUrl = '';
    // On click function for the login button
    const onButtonClick = () => {
        history.push('login');
    };

    return (
        <Wrapper>
            <Menu>
                <MenuText>Meny</MenuText>
                {props.isSidebarVisible ? (
                    <StyledCross onClick={props.toggleSidebar} />
                ) : (
                    <StyledHamburger onClick={props.toggleSidebar} />
                )}
            </Menu>
            {keycloak.authenticated ? (
                <Profile>
                    <MyLink to="/profile">Min side</MyLink>
                    {profilePicUrl ? <ProfilePicture /> : <DefaultProfilePicture />}
                </Profile>
            ) : (
                <button onClick={onButtonClick}>Login</button>
            )}
        </Wrapper>
    );
};
