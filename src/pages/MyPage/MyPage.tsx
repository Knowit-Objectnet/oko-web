import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { Colors } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { SideMenu } from './SideMenu';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const DefaultProfilePicture = styled(Default)`
    width: 50px;
    height: 50px;
    margin-right: 15px;
`;

const LogoutButton = styled.button`
    margin-left: 35px;
    height: 45px;
    width: 100px;
    border: none;
    color: ${Colors.White};
    background-color: ${Colors.DarkBlue};
`;

/**
 * Profile component to view your information
 */
export const MyPage: React.FC = () => {
    const history = useHistory();

    const onLogoutClick = () => {
        history.push('/logout');
    };

    return (
        <Wrapper>
            <Content>
                <Header>
                    <DefaultProfilePicture />
                    <h2>Min side</h2>
                    <LogoutButton onClick={onLogoutClick}>Logg ut</LogoutButton>
                </Header>
                <ContactInfo contacts={[]} />
            </Content>
            <SideMenu />
        </Wrapper>
    );
};
