import styled, { css } from 'styled-components';
import { ButtonBase } from './ButtonBase';

export const NegativeButton = styled(ButtonBase)(
    (props) => css`
        background-color: ${props.theme.colors.Red};
        color: ${props.theme.colors.Black};
        & svg {
            fill: ${props.theme.colors.Black};
        }
    `,
);
