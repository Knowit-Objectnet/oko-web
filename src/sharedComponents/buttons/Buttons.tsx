import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled, { CSSObject } from 'styled-components';
import DotsSpinner from '../../assets/DotsSpinner.svg';

type ButtonSize = 'medium' | 'small';

const buttonSizes: Record<ButtonSize, CSSObject> = {
    medium: {
        padding: '0.75rem 1rem',
        minHeight: '3rem',
    },
    small: {
        padding: '0.5rem 1rem',
        minHeight: '2.5rem',
    },
};

interface StyledButtonProps {
    size: ButtonSize;
    fillWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;
    border: none;
    font-weight: bold;
    font-size: 0.875rem;
    ${(props) => props.fillWidth && 'width: 100%;'}
    ${(props) => buttonSizes[props.size]}
    
    &:disabled {
        // TODO: this is not an ideal solution, because it also makes the button transparent when in loading state
        opacity: 0.6;
    }
`;

const Content = styled.span<{ hidden: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    // Hiding the content with opacity preserves a11y (screen readers can read transparent content)
    opacity: ${(props) => (props.hidden ? 0 : 1)};
`;

const LoadingSpinner = styled(DotsSpinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    height: 0.375rem;
    width: auto;
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    fillWidth?: boolean;
    isLoading?: boolean;
}

const ButtonBase: React.FC<ButtonProps> = ({ size = 'medium', isLoading = false, children, ...otherProps }) => (
    <StyledButton
        size={size}
        disabled={isLoading}
        aria-disabled={isLoading}
        aria-live="polite"
        aria-busy={isLoading}
        {...otherProps}
    >
        <Content hidden={isLoading}>{children}</Content>
        {isLoading ? <LoadingSpinner /> : null}
    </StyledButton>
);

export const ButtonIcon = styled.span`
    height: 1.25rem;
    & > * {
        height: 100%;
    }
    &:not(:last-child) {
        margin-right: 0.2rem;
    }
    &:not(:first-child) {
        margin-left: 0.2rem;
    }
`;

export const PrimaryButton = styled(ButtonBase)((props) => ({
    backgroundColor: props.theme.colors.DarkBlue,
    color: props.theme.colors.White,
    '& svg': { fill: props.theme.colors.White },
}));

export const PositiveButton = styled(ButtonBase)((props) => ({
    backgroundColor: props.theme.colors.Green,
    color: props.theme.colors.Black,
    '& svg': { fill: props.theme.colors.Black },
}));

export const NegativeButton = styled(ButtonBase)((props) => ({
    backgroundColor: props.theme.colors.Red,
    color: props.theme.colors.Black,
    '& svg': { fill: props.theme.colors.Black },
}));

export const TextButton = styled(ButtonBase)((props) => ({
    backgroundColor: 'transparent',
    color: props.theme.colors.Black,
    cursor: 'pointer',
    padding: '0.2rem',
    '& svg': {
        fill: props.theme.colors.Black,
    },
    '&:hover': {
        textDecoration: 'underline',
    },
}));
