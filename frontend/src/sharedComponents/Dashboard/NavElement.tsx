import * as React from 'react';
import styled from 'styled-components';

interface StyledElementProps {
    selected: boolean;
}

const Element = styled.div<StyledElementProps>`
    width: 184px;
    background-color: #ffffff;
    border-radius: 10px 10px 0px 0px;
    border-bottom: ${(props) => (props.selected ? null : 'solid 1px #AFAFAF')};
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;

    &:first-child {
        margin-left: 137px;
    }

    &:not(:last-child) {
        margin-right: 27px;
    }
`;

interface NavElementProps {
    text: string;
    selected: boolean;
    location: string;
    onClick: (location: string) => void;
}

export const NavElement: React.FC<NavElementProps> = (props) => {
    const onClick = (e: React.SyntheticEvent) => {
        props.onClick(props.location);
    };

    return (
        <Element selected={props.selected} onClick={onClick}>
            {props.text}
        </Element>
    );
};
