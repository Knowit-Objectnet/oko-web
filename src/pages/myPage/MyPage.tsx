import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { Roles } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { AdminButtonMenu } from './AdminButtonMenu';
import { ShareContactInfo } from './ShareContactInfo';
import { AboutPartner } from './AboutPartner';
import { Button } from '../../sharedComponents/Button';
import { Helmet } from 'react-helmet';

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

interface ContentProps {
    sideMenuVisible: boolean;
}

const Content = styled.div<ContentProps>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: ${(props) => (props.sideMenuVisible ? '100%' : '80%')};
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 45px;
    width: 100%;
`;

const DefaultProfilePicture = styled(Default)`
    width: 50px;
    height: 50px;
    margin-right: 15px;
`;

/**
 * Profile component to view your information
 */
export const MyPage: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed.GroupID;
    const isPartner = keycloak.hasRealmRole(Roles.Partner);
    const isRegEmployee = keycloak.hasRealmRole(Roles.Oslo);
    const history = useHistory();

    const onLogoutClick = () => {
        history.push('/logout');
    };

    return (
        <>
            <Helmet>
                <title>Min side</title>
            </Helmet>
            <Wrapper>
                <Content sideMenuVisible={isPartner}>
                    <Header>
                        <DefaultProfilePicture />
                        <h2>Min side</h2>
                        <Button
                            onClick={onLogoutClick}
                            text="Logg ut"
                            color="DarkBlue"
                            width={100}
                            styling="margin-left: auto;"
                        />
                    </Header>
                    {isPartner && <AboutPartner userId={userId} />}
                    <ContactInfo info={{ name: keycloak.tokenParsed.name, mail: keycloak.tokenParsed.email }} />
                    {isPartner && <ShareContactInfo />}
                </Content>
                {isRegEmployee && <AdminButtonMenu />}
            </Wrapper>
        </>
    );
};
