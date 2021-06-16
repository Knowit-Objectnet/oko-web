import * as React from 'react';
import { ButtonHTMLAttributes } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import DotsSpinner from '../../../assets/DotsSpinner.svg';

type ButtonSize = 'medium' | 'small';

const BUTTON_SIZES: Record<ButtonSize, SimpleInterpolation> = {
    medium: css`
        padding: 0.75rem 1rem;
        min-height: 3rem;
    `,
    small: css`
        padding: 0.5rem 1rem;
        min-height: 2.5rem;
    `,
};

interface StyledButtonProps {
    size: ButtonSize;
    fillWidth?: boolean;
}

const Button = styled.button<StyledButtonProps>`
    position: relative;
    border: none;
    font-weight: bold;
    font-size: 0.875rem;
    ${(props) => BUTTON_SIZES[props.size]}
    ${(props) => props.fillWidth && 'width: 100%; flex-grow: 1;'}
    
    &:disabled span {
        opacity: 0.6;
    }
`;

const Content = styled.span<{ isHidden: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;

    /** Hiding text content with opacity preserves a11y (screen readers can read transparent content) */
    ${(props) => props.isHidden && '&&& { opacity: 0; }'};
`;

const Icon = styled.span`
    height: 1.25rem;
    & * {
        height: 100%;
    }
`;

const LeftIcon = styled(Icon)`
    margin-right: 0.25rem;
`;

const RightIcon = styled(Icon)`
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

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    fillWidth?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
}

/** Not meant to be used directly, use/create a styled button variant instead (e.g. `<PrimaryButton>`) */
export const BaseButton: React.FC<ButtonProps> = ({
    size = 'medium',
    isLoading = false,
    leftIcon,
    rightIcon,
    children,
    ...otherProps
}) => (
    <Button size={size} disabled={isLoading} aria-live="polite" aria-busy={isLoading} {...otherProps}>
        <Content isHidden={isLoading}>
            {leftIcon ? <LeftIcon aria-hidden={true}>{leftIcon}</LeftIcon> : null}
            {children}
            {rightIcon ? <RightIcon aria-hidden={true}>{rightIcon}</RightIcon> : null}
        </Content>
        {isLoading ? <LoadingSpinner /> : null}
    </Button>
);
