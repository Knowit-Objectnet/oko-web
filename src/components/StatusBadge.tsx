import styled, { css, SimpleInterpolation } from 'styled-components';

type BadgeSize = 'medium' | 'small';

const BADGE_SIZES: Record<BadgeSize, SimpleInterpolation> = {
    medium: css`
        padding: 0.75rem 1rem;
        min-height: 3rem;
    `,
    small: css`
        padding: 0.25rem 0.75rem;
        min-height: 2.5rem;
    `,
};

interface StatusBadgeProps {
    size?: BadgeSize;
    fillWidth?: boolean;
}

const BaseStatusBadge = styled.div<StatusBadgeProps>(
    ({ size = 'medium', ...props }) => css`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        font-weight: bold;
        border: 0.125rem solid;
        background-color: ${props.theme.colors.White};
        color: ${props.theme.colors.Black};
        ${props.fillWidth && 'width: 100%; flex-grow: 1;'}
        ${BADGE_SIZES[size]}
    `,
);

export const NegativeStatusBadge = styled(BaseStatusBadge)`
    border-color: ${(props) => props.theme.colors.Red};
`;

export const PositiveStatusBadge = styled(BaseStatusBadge)`
    border-color: ${(props) => props.theme.colors.Green};
`;

export const NeutralStatusBadge = styled(BaseStatusBadge)`
    border-color: ${(props) => props.theme.colors.Blue};
`;
