import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { Roles } from '../../types';
import { Link } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { UserProfileSideMenu } from './UserProfileSideMenu';
import { ShareContactInfo } from './ShareContactInfo';
import { AboutPartner } from './AboutPartner';
import { Helmet } from 'react-helmet';
import { PrimaryButton } from '../../sharedComponents/buttons/PrimaryButton';
import { Dashboard } from '../../sharedComponents/Dashboard/Dashboard';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 40px;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex-basis: 80%;
`;

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 45px;
    width: 100%;
`;

const LogoutLink = styled(Link)`
    margin-left: auto;
`;

const DefaultProfilePicture = styled(Default)`
    width: 50px;
    height: 50px;
    margin-right: 15px;
`;

export const UserProfile: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userIsPartner = keycloak.hasRealmRole(Roles.Partner);
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);

    return (
        <>
            <Helmet>
                <title>Min side</title>
            </Helmet>
            <Wrapper>
                <Content>
                    <Header>
                        <DefaultProfilePicture />
                        <h2>Min side</h2>
                        <LogoutLink to="/loggut">
                            <PrimaryButton>Logg ut</PrimaryButton>
                        </LogoutLink>
                    </Header>
                    {userIsPartner && <AboutPartner />}
                    <ContactInfo info={{ name: keycloak.tokenParsed.name, mail: keycloak.tokenParsed.email }} />
                    {userIsPartner && <ShareContactInfo />}
                </Content>
                {userIsAdmin && <UserProfileSideMenu />}
            </Wrapper>
        </>
    );
};
