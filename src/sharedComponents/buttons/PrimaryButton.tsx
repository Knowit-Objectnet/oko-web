import styled, { css } from 'styled-components';
import { ButtonBase } from './ButtonBase';

export const PrimaryButton = styled(ButtonBase)(
    (props) => css`
        background-color: ${props.theme.colors.DarkBlue};
        color: ${props.theme.colors.White};
        & svg {
            fill: ${props.theme.colors.White};
        }
    `,
);
