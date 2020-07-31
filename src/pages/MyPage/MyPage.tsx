import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { apiUrl, Colors } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { SideMenu } from './SideMenu';
import { Modal } from '../../sharedComponents/Modal';
import { useState } from 'react';
import { NewPartner } from './NewPartner';
import { NewLocation } from './NewLocation';
import { PostToAPI } from '../../utils/PostToAPI';
import keycloak from '../../keycloak';
import { useAlert, types } from 'react-alert';
import { FetchError } from '../../utils/FetchError';

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
            await PostToAPI(`${apiUrl}/partners/`, data, keycloak.token);
            alert.show('Ny partner ble lagt til suksessfullt.', { type: types.SUCCESS });

            setShowModal(false);
        } catch (err) {
            if (err instanceof FetchError && err.code === 409) {
                alert.show('En partner med det navnet eksisterer allerede, vennligst velg et annet navn', {
                    type: types.ERROR,
                });
            } else {
                alert.show('Noe gikk galt, ny partner ble ikke lagt til.', { type: types.ERROR });
            }
        }
    };

    // TODO: Update to support opening/closing & closed on individual days
    const submitNewLocation = async (
        name: string,
        monday: [Date, Date, boolean],
        tuesday: [Date, Date, boolean],
        wednesday: [Date, Date, boolean],
        thursday: [Date, Date, boolean],
        friday: [Date, Date, boolean],
        saturday: [Date, Date, boolean],
        sunday: [Date, Date, boolean],
    ) => {
        try {
            // Turn the data into the correct format for the API
            const data = {
                name: name,
                openingTime: `${monday[0]
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${monday[0]
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}:${monday[0].getSeconds().toString().padStart(2, '0')}Z`,
                closingTime: `${monday[1]
                    .getHours()
                    .toString()
                    .padStart(2, '0')}:${monday[1]
                    .getMinutes()
                    .toString()
                    .padStart(2, '0')}:${monday[1].getSeconds().toString().padStart(2, '0')}Z`,
            };

            // Post to the api, show alert that it was successful if it was and close the modal
            await PostToAPI(`${apiUrl}/stations`, data, keycloak.token);
            alert.show('Ny partner ble lagt til suksessfullt.', { type: types.SUCCESS });

            setShowModal(false);
        } catch (err) {
            // Show appropriate error alert if something went wrong.
            if (err instanceof FetchError && err.code === 409) {
                alert.show('En stasjon med det navnet eksisterer allerede, vennligst velg et annet navn', {
                    type: types.ERROR,
                });
            } else {
                alert.show('Noe gikk galt, ny stasjon ble ikke lagt til.', { type: types.ERROR });
            }
        }
    };

    // Function to show new partner ui modal
    const showNewPartner = () => {
        setModalContent(<NewPartner onSubmit={submitNewPartner} />);
        setShowModal(true);
    };

    // Function to show new location ui modal
    const showNewLocation = () => {
        setModalContent(<NewLocation onSubmit={submitNewLocation} />);
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
                    <ContactInfo info={{ name: keycloak.tokenParsed.name, mail: keycloak.tokenParsed.email }} />
                </Content>
                <SideMenu newPartnerClick={showNewPartner} newLocationClick={showNewLocation} />
            </Wrapper>
        </>
    );
};
