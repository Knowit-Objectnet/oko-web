import * as React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/Plus.svg';
import Minus from '../../assets/Minus.svg';
import { Colors, Roles } from '../../types';
import { useKeycloak } from '@react-keycloak/web';

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
    background-color: ${Colors.LightBeige};
`;

interface ButtonProps {
    deletion?: boolean;
}

const Button = styled.div<ButtonProps>`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${(props) => (props.deletion ? Colors.Red : Colors.Green)};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

interface SideMenuProps {
    newPartnerClick: () => void;
    newLocationClick: () => void;
    deletePartnerClick: () => void;
    deleteLocationClick: () => void;
}

/**
 * Component that lets a user either create a new event (if REG) or toggle between agenda and calendar (if
 * ambassador or partner)
 */
export const SideMenu: React.FC<SideMenuProps> = (props) => (
    <Wrapper>
        <Item>
            <Description>Ny sam.partner</Description>
            <Button onClick={props.newPartnerClick}>
                <Plus height="100%" />
            </Button>
        </Item>
        <Item>
            <Description>Ny stasjon</Description>
            <Button onClick={props.newLocationClick}>
                <Plus height="100%" />
            </Button>
        </Item>
        <Item>
            <Description>Slett sam.partner</Description>
            <Button deletion={true} onClick={props.deletePartnerClick}>
                <Minus height="100%" />
            </Button>
        </Item>
        <Item>
            <Description>Slett stasjon</Description>
            <Button deletion={true} onClick={props.deleteLocationClick}>
                <Minus height="100%" />
            </Button>
        </Item>
    </Wrapper>
);
