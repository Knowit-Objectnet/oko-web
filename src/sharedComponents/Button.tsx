import * as React from 'react';
import styled, { useTheme } from 'styled-components';
import DotsSpinner from '../assets/DotsSpinner.svg';
import { ButtonHTMLAttributes } from 'react';
import { Colors } from '../theme';

type ButtonVariant = 'primary' | 'positive' | 'negative';

interface ButtonColors {
    bgColor: Colors;
    fgColor: Colors;
}

const useButtonColors = (variant: ButtonVariant) => {
    const theme = useTheme();
    const BUTTON_COLORS: Record<ButtonVariant, ButtonColors> = {
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
    return BUTTON_COLORS[variant];
};

type ButtonSize = 'normal' | 'small';
interface ButtonMeasures {
    padding: string;
    minHeight: string;
}

const MUTTON_MEASURES: Record<ButtonSize, ButtonMeasures> = {
    normal: {
        padding: '0.75rem 1rem',
        minHeight: '3rem',
    },
    small: {
        padding: '0.5rem 1rem',
        minHeight: '2.5rem',
    },
};

interface StyledButtonProps {
    buttonColors: ButtonColors;
    buttonMeasures: ButtonMeasures;
    fillWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${(props) => props.buttonColors.bgColor};
    color: ${(props) => props.buttonColors.fgColor};
    min-height: ${(props) => props.buttonMeasures.minHeight};
    font-weight: bold;
    font-size: 0.875rem;
    border: none;
    padding: ${(props) => props.buttonMeasures.padding};
    ${(props) => props.fillWidth && 'width: 100%;'}
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
    size?: ButtonSize;
    isLoading?: boolean;
    fillWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    text,
    variant = 'primary',
    size = 'normal',
    isLoading = false,
    ...otherProps
}) => {
    const buttonColors = useButtonColors(variant);

    return (
        <StyledButton
            {...otherProps}
            buttonColors={buttonColors}
            buttonMeasures={MUTTON_MEASURES[size]}
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-live="polite"
            aria-busy={isLoading}
        >
            {text}
            {isLoading && <LoadingSpinner color={buttonColors.fgColor} />}
        </StyledButton>
    );
};
