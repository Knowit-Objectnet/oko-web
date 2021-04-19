import * as React from 'react';
import styled from 'styled-components';
import { Roles } from '../../types';
import { Loading } from '../../sharedComponents/Loading';
import Plus from '../../assets/Plus.svg';
import useModal from '../../sharedComponents/Modal/useModal';
import { Helmet } from 'react-helmet';
import { useKeycloak } from '@react-keycloak/web';
import { FloatingActionButton } from '../../sharedComponents/buttons/FloatingActionButton';
import Minus from '../../assets/Minus.svg';
import { NewPartner } from '../../sharedComponents/NewPartner';
import { DeletePartner } from '../../sharedComponents/DeletePartner';
import { usePartners } from '../../api/hooks/usePartners';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    position: relative;
    background-color: ${(props) => props.theme.colors.White};
`;

const PartnerAdminButtons = styled.div`
    position: absolute;
    top: 40px;
    right: 50px;
    display: flex;
    flex-direction: column;
    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    margin-top: 75px;
    margin-bottom: 20px;
    overflow: auto;
`;

export const Partners: React.FC = () => {
    const { keycloak } = useKeycloak();
    const userIsAdmin = keycloak.hasRealmRole(Roles.Oslo);

    const modal = useModal();

    const { data: partners, isLoading } = usePartners();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewPartnerModal = () => {
        modal.show(<NewPartner afterSubmit={closeModalOnSuccess} />);
    };

    const showDeletePartnerModal = () => {
        modal.show(<DeletePartner afterSubmit={closeModalOnSuccess} />);
    };

    if (isLoading) {
        return <Loading text="Laster inn data..." />;
    }

    return (
        <>
            <Helmet>
                <title>Samarbeidspartnere</title>
            </Helmet>
            <Wrapper>
                {userIsAdmin && (
                    <PartnerAdminButtons>
                        <FloatingActionButton
                            label="Ny samarbeidspartner"
                            icon={<Plus />}
                            onClick={showNewPartnerModal}
                            variant="positive"
                        />
                        <FloatingActionButton
                            label="Slett samarbeidspartner"
                            icon={<Minus />}
                            onClick={showDeletePartnerModal}
                            variant="negative"
                        />
                    </PartnerAdminButtons>
                )}
                <Content>
                    <h2>Registrerte samarbeidspartnere</h2>
                    <ul>
                        {partners?.map((partner) => (
                            <li key={partner.id}>{partner.name}</li>
                        ))}
                    </ul>
                </Content>
            </Wrapper>
        </>
    );
};
