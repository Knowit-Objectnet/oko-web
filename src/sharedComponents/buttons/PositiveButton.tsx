import styled, { css } from 'styled-components';
import { BaseButton, ButtonProps } from './BaseButton';
import React from 'react';

export const PositiveButton: React.FC<ButtonProps> = styled(BaseButton)(
    (props) => css`
        background-color: ${props.theme.colors.Green};
        color: ${props.theme.colors.Black};
        & svg {
            fill: ${props.theme.colors.Black};
        }
    `,
);
