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
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
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

    const Icon = styled(props.icon)`
        margin-right: 10px;
        height: 1em;
        fill: ${(props) => (props.selected ? Colors.Blue : Colors.White)};
    `;

    return (
        <Element selected={props.selected} onClick={onClick}>
            <Center>
                <Icon selected={props.selected} />
                {props.text}
            </Center>
        </Element>
    );
};
