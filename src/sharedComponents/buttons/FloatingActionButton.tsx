import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Action } from 'ts-loader/dist/interfaces';
import { Colors } from '../../theme';

type ButtonVariant = 'positive' | 'negative';

interface ButtonColors {
    bgColor: Colors;
    fgColor: Colors;
}

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

const Label = styled.div`
    text-align: center;
    white-space: nowrap;
    padding: 0.8rem;
    line-height: 1.5;
    background-color: ${(props) => props.theme.colors.LightBeige};
    flex-grow: 1;
`;

const StyledButton = styled.button<{ colors: ButtonColors }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0.625rem;
    border: none;
    background-color: ${(props) => props.colors.bgColor};

    & svg {
        fill: ${(props) => props.colors.fgColor};
    }
`;

interface Props {
    label: string;
    /** Hiding the label must be done with caution, for UX and a11y reasons */
    hideLabel?: boolean;
    icon: React.ReactNode;
    variant: ButtonVariant;
    onClick: Action;
}

export const FloatingActionButton: React.FC<Props> = ({ label, hideLabel = false, icon, variant, onClick }) => {
    const theme = useTheme();
    const buttonColors: Record<ButtonVariant, ButtonColors> = {
        positive: {
            bgColor: theme.colors.Green,
            fgColor: theme.colors.Black,
        },
        negative: {
            bgColor: theme.colors.Red,
            fgColor: theme.colors.Black,
        },
    };

    return (
        <ButtonContainer>
            {!hideLabel && <Label>{label}</Label>}
            <StyledButton onClick={onClick} aria-label={label} colors={buttonColors[variant]}>
                {icon}
            </StyledButton>
        </ButtonContainer>
    );
};
