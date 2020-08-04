import * as React from 'react';
import styled from 'styled-components';
import { Colors } from '../types';

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
                return Colors.Red;
            case 'Green':
                return Colors.Green;
            case 'DarkBlue':
                return Colors.DarkBlue;
            default:
                return null;
        }
    }};
    color: ${(props) => (props.color === 'DarkBlue' ? Colors.White : null)};
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
