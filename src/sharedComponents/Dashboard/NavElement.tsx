import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../../types';

interface StyledElementProps {
    selected: boolean;
}

const Element = styled.div<StyledElementProps>`
    color: ${(props) => (props.selected ? Colors.Blue : Colors.White)};
    border-bottom: solid 4px ${(props) => (props.selected ? Colors.Blue : 'transparent')};
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
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.span`
    margin-left: 10px;
`;

interface NavElementProps {
    text: string;
    icon: React.ElementType;
    selected: boolean;
    location: string;
    onClick: (location: string) => void;
}

/**
 * Navigation element for the Navigation bar.
 */
export const NavElement: React.FC<NavElementProps> = (props) => {
    // Calls the onClick from props that changes the location.
    const onClick = (e: React.SyntheticEvent) => {
        props.onClick(props.location);
    };

    return (
        <Element selected={props.selected} onClick={onClick}>
            <Center>
                <props.icon fill={props.selected ? Colors.Blue : Colors.White} height="1em" />
                <Text>{props.text}</Text>
            </Center>
        </Element>
    );
};
