import styled, { css } from 'styled-components';
import { ButtonBase, ButtonProps } from './ButtonBase';
import React from 'react';

export const TextButton: React.FC<ButtonProps> = styled(ButtonBase)(
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
