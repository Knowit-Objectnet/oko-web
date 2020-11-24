import styled, { css } from 'styled-components';
import { BaseButton, ButtonProps } from './BaseButton';
import React from 'react';

export const PrimaryButton: React.FC<ButtonProps> = styled(BaseButton)(
    (props) => css`
        background-color: ${props.theme.colors.DarkBlue};
        color: ${props.theme.colors.White};
        & svg {
            fill: ${props.theme.colors.White};
        }
    `,
);
