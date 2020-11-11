import React from 'react';
import styled from 'styled-components';
import { Action } from 'ts-loader/dist/interfaces';

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

const Button = styled.button<{ variant: ButtonVariant }>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 10px;
    border: none;
    background-color: ${(props) => {
        switch (props.variant) {
            case 'Positive':
                return props.theme.colors.Green;
            case 'Negative':
                return props.theme.colors.Red;
            default:
                return props.theme.colors.DarkBlue;
        }
    }};
`;

type ButtonVariant = 'Positive' | 'Negative';

interface Props {
    label: string;
    icon: React.ReactNode;
    onClick: Action;
    variant: ButtonVariant;
}

export const FloatingActionButton: React.FC<Props> = (props) => (
    <ButtonContainer>
        <Label>{props.label}</Label>
        <Button onClick={props.onClick} aria-label={props.label} variant={props.variant}>
            {props.icon}
        </Button>
    </ButtonContainer>
);
