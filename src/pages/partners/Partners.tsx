import * as React from 'react';
import styled from 'styled-components';
import { Loading } from '../../components/Loading';
import Plus from '../../assets/Plus.svg';
import useModal from '../../components/modal/useModal';
import { Helmet } from 'react-helmet';
import { FloatingActionButton } from '../../components/buttons/FloatingActionButton';
import Minus from '../../assets/Minus.svg';
import { NewPartner } from './NewPartner';
import { DeletePartner } from './DeletePartner';
import { usePartners } from '../../services/hooks/usePartners';
import { useAuth } from '../../auth/useAuth';
import { usePartnere } from '../../services-currentapi/hooks/usePartnere';

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
    const { user } = useAuth();

    const modal = useModal();

    // const { data: partners, isLoading } = usePartners();
    const { data: partnere, isLoading } = usePartnere();

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
                {user.isAdmin && (
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
                        {partnere?.map((partner) => (
                            <li key={partner.id}>{partner.navn}</li>
                        ))}
                    </ul>
                </Content>
            </Wrapper>
        </>
    );
};
