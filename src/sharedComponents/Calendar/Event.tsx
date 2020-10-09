import * as React from 'react';
import styled from 'styled-components';
import { RGBAtoRGB } from '../../utils/RGBAtoRGB';

interface WrapperProps {
    top: number;
    left: number;
    height: number;
    width: number;
    userIsOwner: boolean;
    selected?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
    position: absolute;
    pointer-events: auto;
    top: ${(props) => props.top}px;
    left: ${(props) => props.left}%;
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}%;
    background-color: ${(props) => {
        if (props.selected && props.userIsOwner) {
            return props.theme.colors.LightBlue;
        } else if (!props.selected && props.selected !== undefined && props.userIsOwner) {
            const r = parseInt(props.theme.colors.LightBlue.slice(1, 3), 16);
            const g = parseInt(props.theme.colors.LightBlue.slice(3, 5), 16);
            const b = parseInt(props.theme.colors.LightBlue.slice(5, 7), 16);
            const a = 0.5;
            const rgb = RGBAtoRGB({ r, g, b, a });
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        } else if (props.selected === undefined && props.userIsOwner) {
            return props.theme.colors.LightBlue;
        } else {
            return props.theme.colors.LightBeige;
        }
    }};
    border: ${(props) =>
        props.selected && props.userIsOwner
            ? `5px solid ${props.theme.colors.Blue}`
            : `1px solid ${props.theme.colors.DarkBegie}`};
    color: ${(props) => props.theme.colors.Black};
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const Text = styled.span`
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
`;

interface EventProps {
    top: number;
    left: number;
    width: number;
    height: number;
    index: number;
    title: string;
    onClick: (index: number | undefined) => void;
    userIsOwner: boolean;
    selected?: boolean;
}

export const Event: React.FC<EventProps> = (props) => {
    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.persist();
        // Get the index of the event
        const index = e.currentTarget.dataset['index'];
        try {
            if (index === undefined) {
                throw new Error('index of event was not found');
            }
            props.onClick(parseInt(index));
        } catch {
            props.onClick(undefined);
        }
    };

    return (
        <Wrapper
            top={props.top}
            left={props.left}
            width={props.width}
            height={props.height}
            data-index={props.index}
            onClick={onClick}
            userIsOwner={props.userIsOwner}
            selected={props.selected}
        >
            <Text>{props.title}</Text>
        </Wrapper>
    );
};
