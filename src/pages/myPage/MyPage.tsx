import * as React from 'react';
import styled from 'styled-components';
import { useKeycloak } from '@react-keycloak/web';
import Default from '../../assets/Default_profile_pic.svg';
import { ApiPartner, apiUrl, Roles } from '../../types';
import { useHistory } from 'react-router-dom';
import { ContactInfo } from './ContactInfo';
import { SideMenu } from './SideMenu';
import { useEffect, useState } from 'react';
import { NewPartner } from '../../sharedComponents/NewPartner';
import { NewStation } from '../../sharedComponents/NewStation/NewStation';
import { useAlert, types } from 'react-alert';
import { ShareContactInfo } from './ShareContactInfo';
import { AboutPartner } from './AboutPartner';
import { FetchError } from '../../utils/FetchError';
import { DeletePartner } from '../../sharedComponents/DeletePartner';
import { DeleteStation } from '../../sharedComponents/DeleteStation';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';
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
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // Alert dispatcher
    const alert = useAlert();
    // Modal dispatcher
    const modal = useModal();
    // State for partner info
    const [partnerInfo, setPartnerInfo] = useState<ApiPartner | undefined>(undefined);

    // History
    const history = useHistory();

    // If the user is a partner, get their info
    if (keycloak.tokenParsed.GroupID && keycloak.hasRealmRole(Roles.Partner)) {
        const { data: apiPartnerInfo } = useSWR<ApiPartner>(
            `${apiUrl}/partners/${keycloak.tokenParsed.GroupID}`,
            fetcher,
        );

        useEffect(() => {
            setPartnerInfo(apiPartnerInfo);
        }, [apiPartnerInfo]);
    }

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

    const closeModalOnSuccess = (successful: boolean) => {
        if (successful) {
            modal.remove();
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

    // Function to show new partner ui modal
    const showNewPartner = () => {
        modal.show(<NewPartner afterSubmit={afterNewPartner} />);
    };

    // Function to show new location ui modal
    const showNewLocation = () => {
        modal.show(<NewStation afterSubmit={closeModalOnSuccess} />);
    };

    // Function to show delete partner ui modal
    const showDeletePartner = () => {
        modal.show(<DeletePartner afterSubmit={afterDeletePartner} />);
    };

    // Function to show delete location ui modal
    const showDeleteLocation = () => {
        modal.show(<DeleteStation afterSubmit={closeModalOnSuccess} />);
    };

    return (
        <>
            <Helmet>
                <title>Min side</title>
            </Helmet>
            <Wrapper>
                <Content sideMenuVisible={keycloak.hasRealmRole(Roles.Oslo)}>
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
                    {keycloak.hasRealmRole(Roles.Partner) && (
                        <AboutPartner
                            name={partnerInfo ? partnerInfo.name : keycloak.tokenParsed.groups[0] || '<laster inn...>'}
                            description={partnerInfo ? partnerInfo.description : 'Laster inn...'}
                        />
                    )}
                    <ContactInfo info={{ name: keycloak.tokenParsed.name, mail: keycloak.tokenParsed.email }} />
                    {keycloak.hasRealmRole(Roles.Partner) && <ShareContactInfo />}
                </Content>
                {keycloak.hasRealmRole(Roles.Oslo) && (
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
