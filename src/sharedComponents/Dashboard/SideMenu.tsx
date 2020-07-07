import * as React from 'react';
import styled from 'styled-components';
import Hamburger from '../../assets/Hamburger.svg';
import Default from '../../assets/Default_profile_pic.svg';
import { Colors } from '../../types';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 40px;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid ${Colors.White};
    font-size: 22px;
    line-height: 31px;
    color: ${Colors.White};
    padding: 16px;
    margin-right: 45px;
`;

const MenuText = styled.span`
    font-size: 22px;
    line-height: 31px;
    margin-right: 23px;
`;

const Profile = styled.div``;

const ProfilePicture = styled.img``;

const DefaultProfilePicture = styled(Default)`
    width: 50px;
    height: 50px;
    fill: ${Colors.White};
`;

/**
 * Side menu for quick-naviagtion and user icon
 */
export const SideMenu: React.FC = () => {
    const profilePicUrl = '';
    return (
        <Wrapper>
            <Menu>
                <MenuText>Meny</MenuText>
                <Hamburger height="1em" fill={Colors.White} />
            </Menu>
            <Profile>{profilePicUrl ? <ProfilePicture /> : <DefaultProfilePicture />}</Profile>
        </Wrapper>
    );
};
