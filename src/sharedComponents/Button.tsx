import * as React from 'react';
import styled from 'styled-components';
import DotsSpinner from '../assets/DotsSpinner.svg';
import { ButtonHTMLAttributes } from 'react';

type ButtonColor = 'Red' | 'Green' | 'DarkBlue';

interface StyledButtonProps {
    color?: ButtonColor;
    width?: number;
    height?: number;
    styling?: string;
}

const StyledButton = styled.button<StyledButtonProps>`
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
    min-height: ${(props) => (props.height ? props.height + 'px' : '45px')};
    min-width: ${(props) => (props.width ? props.width + 'px' : null)};
    font-weight: bold;
    font-size: 0.875rem;
    border: none;
    padding: 0.75rem 1rem;
    ${(props) => props.styling}
`;

const LoadingSpinner = styled(DotsSpinner)<{ color?: ButtonColor }>`
    vertical-align: middle;
    height: 0.375rem;
    transform: translateY(-20%);
    width: auto;
    margin-left: 0.75rem;
    fill: ${(props) => props.color === 'DarkBlue' && props.theme.colors.White};
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    color?: ButtonColor;
    width?: number;
    height?: number;
    styling?: string;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton
            {...props}
            disabled={props.loading}
            aria-disabled={props.loading}
            aria-live="polite"
            aria-busy={props.loading}
        >
            {props.text}
            {props.loading && <LoadingSpinner color={props.color} />}
        </StyledButton>
    );
};
