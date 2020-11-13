import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Action } from 'ts-loader/dist/interfaces';
import { Colors } from '../theme';

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

const Button = styled.button<{ colors: ButtonColors }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 10px;
    border: none;
    background-color: ${(props) => props.colors.bgColor};

    & svg {
        fill: ${(props) => props.colors.fgColor};
    }
`;

type ButtonVariant = 'positive' | 'negative';
type ButtonColors = Record<'bgColor' | 'fgColor', Colors>;

interface Props {
    label: string;
    icon: React.ReactNode;
    onClick: Action;
    variant: ButtonVariant;
}

export const FloatingActionButton: React.FC<Props> = (props) => {
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
            <Label>{props.label}</Label>
            <Button onClick={props.onClick} aria-label={props.label} colors={buttonColors[props.variant]}>
                {props.icon}
            </Button>
        </ButtonContainer>
    );
};
