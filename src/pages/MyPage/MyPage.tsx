import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { Colors } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { SideMenu } from './SideMenu';
import { Modal } from '../../sharedComponents/Modal';
import { useState } from 'react';
import { NewPartner } from './NewPartner';
import { NewLocation } from './NewLocation';

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
    // State for handling modal
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

    // History
    const history = useHistory();

    // Logout function for the logout button click
    const onLogoutClick = () => {
        history.push('/logout');
    };

    // Function to show new partner ui modal
    const showNewPartner = () => {
        setModalContent(<NewPartner />);
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
                <Content>
                    <Header>
                        <DefaultProfilePicture />
                        <h2>Min side</h2>
                        <LogoutButton onClick={onLogoutClick}>Logg ut</LogoutButton>
                    </Header>
                    <ContactInfo contacts={[]} />
                </Content>
                <SideMenu newPartnerClick={showNewPartner} newLocationClick={showNewLocation} />
            </Wrapper>
        </>
    );
};