import * as React from 'react';
import styled from 'styled-components';

interface WrapperProps {
    color?: 'Red' | 'Green' | 'DarkBlue';
    width?: number;
    height?: number;
    styling?: string;
}

const Wrapper = styled.button<WrapperProps>`
    background-color: ${(props) => {
        switch (props.color) {
            case 'Red':
                return props.theme.colors.Red;
            case 'Green':
                return props.theme.colors.Green;
            case 'DarkBlue':
                return props.theme.colors.DarkBlue;
            default:
                return null;
        }
    }};
    color: ${(props) => props.color === 'DarkBlue' && props.theme.colors.White};
    height: ${(props) => (props.height ? props.height + 'px' : '45px')};
    width: ${(props) => (props.width ? props.width + 'px' : null)};
    font-weight: bold;
    border: none;
    ${(props) => props.styling}
`;

interface ButtonProps {
    text: string;
    color?: 'Red' | 'Green' | 'DarkBlue';
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    name?: string;
    width?: number;
    height?: number;
    styling?: string;
}

export const Button: React.FC<ButtonProps> = (props) => (
    <Wrapper
        color={props.color}
        onClick={props.onClick}
        name={props.name}
        width={props.width}
        height={props.height}
        styling={props.styling}
    >
        {props.text}
    </Wrapper>
);
