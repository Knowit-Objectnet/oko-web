import * as React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/Plus.svg';
import Minus from '../../assets/Minus.svg';
import { NewStation } from '../../sharedComponents/NewStation/NewStation';
import { DeleteStation } from '../../sharedComponents/DeleteStation';
import useModal from '../../sharedComponents/Modal/useModal';
import { NewPartner } from '../../sharedComponents/NewPartner';
import { DeletePartner } from '../../sharedComponents/DeletePartner';
import { FloatingActionButton } from '../../sharedComponents/buttons/FloatingActionButton';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 45px;

    & > *:not(:last-child) {
        margin-bottom: 25px;
    }
`;

export const UserProfileSideMenu: React.FC = () => {
    const modal = useModal();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewStationModal = () => {
        modal.show(<NewStation afterSubmit={closeModalOnSuccess} />);
    };

    const showDeleteStationModal = () => {
        modal.show(<DeleteStation afterSubmit={closeModalOnSuccess} />);
    };

    const showNewPartnerModal = () => {
        modal.show(<NewPartner afterSubmit={closeModalOnSuccess} />);
    };

    const showDeletePartnerModal = () => {
        modal.show(<DeletePartner afterSubmit={closeModalOnSuccess} />);
    };

    return (
        <Wrapper>
            <FloatingActionButton
                label="Ny samarbeidspartner"
                icon={<Plus />}
                onClick={showNewPartnerModal}
                variant="positive"
            />
            <FloatingActionButton label="Ny stasjon" icon={<Plus />} onClick={showNewStationModal} variant="positive" />
            <FloatingActionButton
                label="Slett samarbeidspartner"
                icon={<Minus />}
                onClick={showDeletePartnerModal}
                variant="negative"
            />
            <FloatingActionButton
                label="Slett stasjon"
                icon={<Minus />}
                onClick={showDeleteStationModal}
                variant="negative"
            />
        </Wrapper>
    );
};
