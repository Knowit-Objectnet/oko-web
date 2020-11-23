import styled, { css } from 'styled-components';
import { ButtonBase } from './ButtonBase';

export const PositiveButton = styled(ButtonBase)(
    (props) => css`
        background-color: ${props.theme.colors.Green};
        color: ${props.theme.colors.Black};
        & svg {
            fill: ${props.theme.colors.Black};
        }
    `,
);
