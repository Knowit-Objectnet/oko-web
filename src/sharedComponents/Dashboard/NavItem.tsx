import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavLink = styled(NavLink)`
    color: ${(props) => props.theme.colors.White};
    border-bottom: solid 4px transparent;
    font-weight: bold;
    font-size: 22px;
    line-height: 31px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    user-select: none;

    &:not(:last-child) {
        margin-right: 80px;
    }

    @media screen and (max-width: 1100px) {
        &:not(:last-child) {
            margin-right: 40px;
        }

        margin-right: 40px;
    }

    @media screen and (max-width: 800px) {
        font-size: 16px;

        &:not(:last-child) {
            margin-right: 15px;
        }

        margin-right: 15px;
    }

    &.activeNavLink {
        color: ${(props) => props.theme.colors.Blue};
        border-bottom-color: ${(props) => props.theme.colors.Blue};

        svg {
            fill: ${(props) => props.theme.colors.Blue};
        }
    }
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.span`
    > svg {
        fill: ${(props) => props.theme.colors.White};
        height: 1em;
    }
`;

const Label = styled.span`
    margin-left: 10px;
`;

export interface NavItemProps {
    path: string;
    icon: React.ReactNode;
    label: string;
    exact?: boolean;
}

export const NavItem: React.FC<NavItemProps> = (props) => (
    <StyledNavLink to={props.path} exact={props.exact} activeClassName="activeNavLink">
        <Center>
            <Icon>{props.icon}</Icon>
            <Label>{props.label}</Label>
        </Center>
    </StyledNavLink>
);
