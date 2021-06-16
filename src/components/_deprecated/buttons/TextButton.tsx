import styled, { css } from 'styled-components';
import { BaseButton, ButtonProps } from './BaseButton';
import React from 'react';

export const TextButton: React.FC<ButtonProps> = styled(BaseButton)(
    (props) => css`
        background-color: transparent;
        color: ${props.theme.colors.Black};
        cursor: pointer;
        padding: 0.25rem;
        & svg {
            fill: ${props.theme.colors.Black};
        }
        &:hover {
            text-decoration: underline;
        }
    `,
);
