import styled, { css } from 'styled-components';
import { ButtonBase, ButtonProps } from './ButtonBase';
import React from 'react';

export const PrimaryButton: React.FC<ButtonProps> = styled(ButtonBase)(
    (props) => css`
        background-color: ${props.theme.colors.DarkBlue};
        color: ${props.theme.colors.White};
        & svg {
            fill: ${props.theme.colors.White};
        }
    `,
);
