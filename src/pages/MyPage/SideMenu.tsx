import * as React from 'react';
import styled from 'styled-components';
import Plus from '../../assets/Plus.svg';
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
    width: 120px;
    background-color: ${Colors.LightBeige};
`;

const Button = styled.div`
    width: 50px;
    height: 50px;
    padding: 10px;
    background-color: ${Colors.Green};
    border-radius: 50%;
    box-sizing: border-box;

    &:not(:last-child) {
        margin-bottom: 30px;
    }
`;

interface SideMenuProps {
    newPartnerClick: () => void;
    newLocationClick: () => void;
}

/**
 * Component that lets a user either create a new event (if REG) or toggle between agenda and calendar (if
 * ambassador or partner)
 */
export const SideMenu: React.FC<SideMenuProps> = (props) => (
    <Wrapper>
        <Item>
            <Description>Ny sam.parter</Description>
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
    </Wrapper>
);
