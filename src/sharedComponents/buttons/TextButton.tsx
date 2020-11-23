import styled, { css } from 'styled-components';
import { ButtonBase } from './ButtonBase';

export const TextButton = styled(ButtonBase)(
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
