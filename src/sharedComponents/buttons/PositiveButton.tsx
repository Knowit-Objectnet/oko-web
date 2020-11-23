import styled, { css } from 'styled-components';
import { ButtonBase, ButtonProps } from './ButtonBase';
import React from 'react';

export const PositiveButton: React.FC<ButtonProps> = styled(ButtonBase)(
    (props) => css`
        background-color: ${props.theme.colors.Green};
        color: ${props.theme.colors.Black};
        & svg {
            fill: ${props.theme.colors.Black};
        }
    `,
);
