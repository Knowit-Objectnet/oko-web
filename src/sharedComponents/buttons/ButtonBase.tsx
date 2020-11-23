import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import DotsSpinner from '../../assets/DotsSpinner.svg';

type ButtonSize = 'medium' | 'small';

const BUTTON_SIZES: Record<ButtonSize, FlattenSimpleInterpolation> = {
    medium: css`
        padding: 0.75rem 1rem;
        min-height: 3rem;
    `,
    small: css`
        padding: 0.5rem 1rem;
        min-height: 2.5rem;
    `,
};

const FULL_BUTTON_WIDTH = css`
    width: 100%;
    flex-grow: 1;
`;

interface StyledButtonProps {
    size: ButtonSize;
    fillWidth?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;
    border: none;
    font-weight: bold;
    font-size: 0.875rem;
    ${(props) => BUTTON_SIZES[props.size]}
    ${(props) => props.fillWidth && FULL_BUTTON_WIDTH}
    
    &:disabled span {
        opacity: 0.6;
    }
`;

/** Hiding text content with opacity preserves a11y (screen readers can read transparent content) */
const HIDE_ELEMENT = css`
    &&& {
        opacity: 0;
    }
`;

const Content = styled.span<{ hidden: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) => props.hidden && HIDE_ELEMENT};
`;

const ButtonIcon = styled.span`
    height: 1.25rem;
    & * {
        height: 100%;
    }
`;

/** Wrap left-aligned icons in this component to get the correct size and padding */
export const LeftButtonIcon = styled(ButtonIcon)`
    margin-right: 0.25rem;
`;

/** Wrap right-aligned icons in this component to get the correct size and padding */
export const RightButtonIcon = styled(ButtonIcon)`
    margin-left: 0.25rem;
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

export const ButtonBase: React.FC<ButtonProps> = ({ size = 'medium', isLoading = false, children, ...otherProps }) => (
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
