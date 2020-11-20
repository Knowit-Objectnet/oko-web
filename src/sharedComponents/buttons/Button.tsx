import * as React from 'react';
import styled, { CSSObject, CSSProperties } from 'styled-components';
import DotsSpinner from '../../assets/DotsSpinner.svg';
import { ButtonHTMLAttributes } from 'react';
import { variant } from 'styled-system';
import { ThemeType } from '../../theme';

type ButtonVariant = 'primary' | 'positive' | 'negative' | 'text';
type ButtonSize = 'medium' | 'small';

interface StyledButtonProps {
    variant: ButtonVariant;
    size: ButtonSize;
    fillWidth?: boolean;
}

const buttonSizes = variant<CSSProperties, ButtonSize, keyof StyledButtonProps>({
    prop: 'size',
    variants: {
        medium: {
            padding: '0.75rem 1rem',
            minHeight: '3rem',
        },
        small: {
            padding: '0.5rem 1rem',
            minHeight: '2.5rem',
        },
    },
});

const buttonVariants = (theme: ThemeType) =>
    variant<CSSObject, ButtonVariant, keyof StyledButtonProps>({
        prop: 'variant',
        variants: {
            primary: {
                backgroundColor: theme.colors.DarkBlue,
                color: theme.colors.White,
                '& svg': { fill: theme.colors.White },
            },
            positive: {
                backgroundColor: theme.colors.Green,
                color: theme.colors.Black,
                '& svg': { fill: theme.colors.Black },
            },
            negative: {
                backgroundColor: theme.colors.Red,
                color: theme.colors.Black,
                '& svg': { fill: theme.colors.Black },
            },
            text: {
                backgroundColor: 'transparent',
                color: theme.colors.Black,
                cursor: 'pointer',
                padding: '0.2rem',
                '& svg': {
                    fill: theme.colors.Black,
                },
                '&:hover': {
                    textDecoration: 'underline',
                },
            },
        },
    });

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;
    border: none;
    font-weight: bold;
    font-size: 0.875rem;
    ${(props) => props.fillWidth && 'width: 100%;'}
    ${buttonSizes}
    ${(props) => buttonVariants(props.theme)}
`;

const Content = styled.span<{ visible: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const Icon = styled.span`
    height: 1.5rem;

    & > * {
        height: 100%;
    }
`;

const LeftIcon = styled(Icon)`
    margin-right: 0.125rem;
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
    variant?: ButtonVariant;
    size?: ButtonSize;
    fillWidth?: boolean;
    leftIcon?: React.ReactElement;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    isLoading = false,
    leftIcon,
    children,
    ...otherProps
}) => {
    return (
        <StyledButton
            variant={variant}
            size={size}
            disabled={isLoading}
            aria-disabled={isLoading}
            aria-live="polite"
            aria-busy={isLoading}
            {...otherProps}
        >
            <Content visible={!isLoading}>
                {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
                {children}
            </Content>
            {isLoading && <LoadingSpinner />}
        </StyledButton>
    );
};
