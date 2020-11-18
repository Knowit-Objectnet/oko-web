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

const BUTTON_MEASURES: Record<ButtonSize, ButtonMeasures> = {
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
    position: relative;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    height: 0.375rem;
    width: auto;
    fill: ${(props) => props.color};
`;

const Content = styled.span<{ visible: boolean }>`
    opacity: ${(props) => (props.visible ? 1 : 0)};
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
            buttonMeasures={BUTTON_MEASURES[size]}
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-live="polite"
            aria-busy={isLoading}
        >
            <Content visible={!isLoading}>{text}</Content>
            {isLoading && <LoadingSpinner color={buttonColors.fgColor} />}
        </StyledButton>
    );
};
