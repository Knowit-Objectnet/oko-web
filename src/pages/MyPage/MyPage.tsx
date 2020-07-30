import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { apiUrl, Colors, Roles } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { SideMenu } from './SideMenu';
import { Modal } from '../../sharedComponents/Modal';
import { useState } from 'react';
import { NewPartner } from './NewPartner';
import { NewLocation } from './NewLocation';
import { PostToAPI } from '../../utils/PostToAPI';
import { useAlert, types } from 'react-alert';
import { ShareContactInfo } from './ShareContactInfo';
import { AboutPartner } from './AboutPartner';

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

const LogoutButton = styled.button`
    margin-left: auto;
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
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert dispatcher
    const alert = useAlert();
    // State for handling modal
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    // History
    const history = useHistory();

    // Logout function for the logout button click
    const onLogoutClick = () => {
        history.push('/logout');
    };

    const submitNewPartner = async (name: string, contract: File | null) => {
        const data: { name: string; contract?: File } = {
            name,
        };

        if (contract) {
            data.contract = contract;
        }

        try {
            await PostToAPI(`${apiUrl}/partner/partners/`, data, keycloak.token);
            alert.show('Ny partner ble lagt til suksessfullt.', { type: types.SUCCESS });

            setShowModal(false);
        } catch (err) {
            alert.show('Noe gikk galt, ny partner ble ikke lagt til.', { type: types.ERROR });
        }
    };

    // Function to show new partner ui modal
    const showNewPartner = () => {
        setModalContent(<NewPartner onSubmit={submitNewPartner} />);
        setShowModal(true);
    };

    // Function to show new location ui modal
    const showNewLocation = () => {
        setModalContent(<NewLocation />);
        setShowModal(true);
    };

    return (
        <>
            {showModal ? (
                <Modal
                    exitModalCallback={() => {
                        setShowModal(false);
                    }}
                    content={modalContent}
                />
            ) : null}
            <Wrapper>
                <Content sideMenuVisible={keycloak.hasRealmRole(Roles.Oslo)}>
                    <Header>
                        <DefaultProfilePicture />
                        <h2>Min side</h2>
                        <LogoutButton onClick={onLogoutClick}>Logg ut</LogoutButton>
                    </Header>
                    {keycloak.hasRealmRole(Roles.Partner) ? (
                        <AboutPartner name="<partner>" description="<description>" />
                    ) : null}
                    <ContactInfo info={{ name: keycloak.tokenParsed.name, mail: keycloak.tokenParsed.email }} />
                    {keycloak.hasRealmRole(Roles.Partner) ? <ShareContactInfo /> : null}
                </Content>
                {keycloak.hasRealmRole(Roles.Oslo) ? (
                    <SideMenu newPartnerClick={showNewPartner} newLocationClick={showNewLocation} />
                ) : null}
            </Wrapper>
        </>
    );
};
