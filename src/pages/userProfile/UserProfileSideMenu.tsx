import * as React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/Plus.svg';
import Minus from '../../assets/Minus.svg';
import { NewStation } from '../../sharedComponents/NewStation/NewStation';
import { DeleteStation } from '../../sharedComponents/DeleteStation';
import useModal from '../../sharedComponents/Modal/useModal';
import { types, useAlert } from 'react-alert';
import { FetchError } from '../../utils/FetchError';
import { NewPartner } from '../../sharedComponents/NewPartner';
import { DeletePartner } from '../../sharedComponents/DeletePartner';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 45px;
`;

const Item = styled.div`
    display: flex;
    flex-direction: row;
    &:not(:last-child) {
        margin-bottom: 25px;
    }
`;

const Description = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

interface ButtonProps {
    deletion?: boolean;
}

const Button = styled.div<ButtonProps>`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${(props) => (props.deletion ? props.theme.colors.Red : props.theme.colors.Green)};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-bottom: 30px;
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
            <Item>
                <Description>Ny sam.partner</Description>
                <Button onClick={showNewPartnerModal}>
                    <Plus height="100%" />
                </Button>
            </Item>
            <Item>
                <Description>Ny stasjon</Description>
                <Button onClick={showNewStationModal}>
                    <Plus height="100%" />
                </Button>
            </Item>
            <Item>
                <Description>Slett sam.partner</Description>
                <Button deletion={true} onClick={showDeletePartnerModal}>
                    <Minus height="100%" />
                </Button>
            </Item>
            <Item>
                <Description>Slett stasjon</Description>
                <Button deletion={true} onClick={showDeleteStationModal}>
                    <Minus height="100%" />
                </Button>
            </Item>
        </Wrapper>
    );
};
