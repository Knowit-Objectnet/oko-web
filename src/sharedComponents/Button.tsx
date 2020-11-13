import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import DotsSpinner from '../assets/DotsSpinner.svg';
import { ButtonHTMLAttributes } from 'react';
import { Colors } from '../theme';

type ButtonVariant = 'primary' | 'positive' | 'negative';
type ButtonColors = Record<'bgColor' | 'fgColor', Colors>;

const StyledButton = styled.button<{ buttonColors: ButtonColors }>`
    background-color: ${(props) => props.buttonColors.bgColor};
    color: ${(props) => props.buttonColors.fgColor};
    min-height: 3rem;
    font-weight: bold;
    font-size: 0.875rem;
    border: none;
    padding: 0.75rem 1rem;
`;

const LoadingSpinner = styled(DotsSpinner)<{ color: Colors }>`
    vertical-align: middle;
    height: 0.375rem;
    transform: translateY(-20%);
    width: auto;
    margin-left: 0.75rem;
    fill: ${(props) => props.color};
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    variant?: ButtonVariant;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ text, loading = false, variant = 'primary', ...rest }) => {
    const theme = useTheme();

    const buttonColors: Record<ButtonVariant, ButtonColors> = {
        primary: {
            bgColor: theme.colors.DarkBlue,
            fgColor: theme.colors.White,
        },
        positive: {
            bgColor: theme.colors.Green,
            fgColor: theme.colors.Black,
        },
        negative: {
            bgColor: theme.colors.Red,
            fgColor: theme.colors.Black,
        },
    };

    return (
        <StyledButton
            {...rest}
            buttonColors={buttonColors[variant]}
            disabled={loading}
            aria-disabled={loading}
            aria-live="polite"
            aria-busy={loading}
        >
            {text}
            {loading && <LoadingSpinner color={buttonColors[variant].fgColor} />}
        </StyledButton>
    );
};
