import styled, { css } from 'styled-components';
import { BaseButton, ButtonProps } from './BaseButton';
import React from 'react';

export const NegativeButton: React.FC<ButtonProps> = styled(BaseButton)(
    (props) => css`
        background-color: ${props.theme.colors.Red};
        color: ${props.theme.colors.Black};
        & svg {
            fill: ${props.theme.colors.Black};
        }
    `,
);
