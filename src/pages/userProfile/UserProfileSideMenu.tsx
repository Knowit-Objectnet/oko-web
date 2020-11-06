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
    const alert = useAlert();

    const closeModalOnSuccess = (successful: boolean) => successful && modal.remove();

    const showNewStationModal = () => {
        modal.show(<NewStation afterSubmit={closeModalOnSuccess} />);
    };

    const showDeleteStationModal = () => {
        modal.show(<DeleteStation afterSubmit={closeModalOnSuccess} />);
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

    const showNewPartnerModal = () => {
        modal.show(<NewPartner afterSubmit={afterNewPartner} />);
    };

    const showDeletePartnerModal = () => {
        modal.show(<DeletePartner afterSubmit={afterDeletePartner} />);
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
