import * as React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/Plus.svg';
import Minus from '../../assets/Minus.svg';
import { NewPartnerModal } from '../../sharedComponents/NewPartnerModal';
import { NewStationModal } from '../../sharedComponents/NewStation/NewStationModal';
import { DeletePartnerModal } from '../../sharedComponents/DeletePartnerModal';
import { DeleteStationModal } from '../../sharedComponents/DeleteStationModal';
import useModal from '../../sharedComponents/Modal/useModal';

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

export const AdminButtonMenu: React.FC = () => {
    const modal = useModal();

    const afterNewPartner = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    const afterDeletePartner = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    const afterNewStation = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    const afterDeleteStation = (successful: boolean) => {
        if (successful) {
            modal.remove();
        }
    };

    const showNewPartnerModal = () => {
        modal.show(<NewPartnerModal afterSubmit={afterNewPartner} />);
    };

    const showNewStationModal = () => {
        modal.show(<NewStationModal afterSubmit={afterNewStation} />);
    };

    const showDeletePartnerModal = () => {
        modal.show(<DeletePartnerModal afterSubmit={afterDeletePartner} />);
    };

    const showDeleteStationModal = () => {
        modal.show(<DeleteStationModal afterSubmit={afterDeleteStation} />);
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
