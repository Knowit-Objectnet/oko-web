import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { Roles } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { SideMenu } from './SideMenu';
import { NewPartner } from '../../sharedComponents/NewPartner';
import { NewLocation } from '../../sharedComponents/NewLocation/NewLocation';
import { types, useAlert } from 'react-alert';
import { ShareContactInfo } from './ShareContactInfo';
import { AboutPartner } from './AboutPartner';
import { FetchError } from '../../utils/FetchError';
import { DeletePartner } from '../../sharedComponents/DeletePartner';
import { DeleteLocation } from '../../sharedComponents/DeleteLocation';
import { Button } from '../../sharedComponents/Button';
import useModal from '../../sharedComponents/Modal/useModal';
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

    const alert = useAlert();

    const modal = useModal();

    const history = useHistory();

    // Logout function for the logout button click
    const onLogoutClick = () => {
        history.push('/logout');
    };

    const afterNewPartner = (successful: boolean, key: string, error: Error | null) => {
        if (successful) {
            alert.show('Ny partner ble lagt til suksessfullt.', { type: types.SUCCESS });

            modal.remove();
        } else {
            if (error instanceof FetchError && error.code === 409) {
                alert.show('En partner med det navnet eksisterer allerede, vennligst velg et annet navn', {
                    type: types.ERROR,
                });
            } else {
                alert.show('Noe gikk galt, ny partner ble ikke lagt til.', { type: types.ERROR });
            }
        }
    };

    const afterDeletePartner = (successful: boolean, key: string) => {
        if (successful) {
            alert.show('Samarbeidspartneren ble slettet suksessfullt.', { type: types.SUCCESS });

            modal.remove();
        } else {
            alert.show('Noe gikk galt, samarbeidspartneren ble ikke slettet.', { type: types.ERROR });
        }
    };

    const afterNewLocation = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    const afterDeleteLocation = (successful: boolean, key: string) => {
        if (successful) {
            alert.show('Stasjonen ble slettet suksessfullt.', { type: types.SUCCESS });

            modal.remove();
        } else {
            alert.show('Noe gikk galt, stasjoneen ble ikke slettet.', { type: types.ERROR });
        }
    };

    // Function to show new partner ui modal
    const showNewPartner = () => {
        modal.show(<NewPartner afterSubmit={afterNewPartner} />);
    };

    // Function to show new location ui modal
    const showNewLocation = () => {
        modal.show(<NewLocation afterSubmit={afterNewLocation} />);
    };

    // Function to show delete partner ui modal
    const showDeletePartner = () => {
        modal.show(<DeletePartner afterSubmit={afterDeletePartner} />);
    };

    // Function to show delete location ui modal
    const showDeleteLocation = () => {
        modal.show(<DeleteLocation afterSubmit={afterDeleteLocation} />);
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
                {isRegEmployee && (
                    <SideMenu
                        newPartnerClick={showNewPartner}
                        newLocationClick={showNewLocation}
                        deletePartnerClick={showDeletePartner}
                        deleteLocationClick={showDeleteLocation}
                    />
                )}
            </Wrapper>
        </>
    );
};
