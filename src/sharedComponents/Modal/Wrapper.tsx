import * as React from 'react';
import styled from 'styled-components';
import Cross from '../../assets/Cross.svg';
import { Options } from './Types';

const Background = styled.div`
    z-index: 60;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div<Options>`
    position: relative;
    z-index: 50;
    background-color: white;
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    min-width: ${(props) => props.minWidth};
    height: ${(props) => props.height};
    max-height: ${(props) => props.maxHeight};
    min-height: ${(props) => props.minHeight};
    border-radius: 0px 0px 6px 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 500px) {
        border-radius: 0;
        min-width: 100%;
    }
`;

const StyledCross = styled(Cross)`
    position: absolute;
    top: 15px;
    right: 15px;
    height: 1em;
`;

interface ModalProps {
    exitModalCallback: () => void;
    content: React.ReactNode;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    minHeight?: number;
    maxHeight?: number;
}

// Modal (pop-up) component
export const Wrapper: React.FC<ModalProps> = (props) => {
    /*
     * Makes it possible to click the modal without triggering the action that happens
     * when you click the background (which usually is to close the modal)
     */
    const stopBackgroundCall = (e: React.SyntheticEvent) => {
        e.stopPropagation();
    };

    // Calls the callback from props for when to exit the modal
    const onExitClick = () => {
        props.exitModalCallback();
    };

    return (
        <Background onClick={props.exitModalCallback}>
            <Content
                width={props.width}
                minWidth={props.minWidth}
                maxWidth={props.maxWidth}
                height={props.height}
                minHeight={props.minHeight}
                maxHeight={props.maxHeight}
                onClick={stopBackgroundCall}
            >
                <StyledCross onClick={onExitClick} />
                {props.content ? props.content instanceof String ? <p>{props.content}</p> : props.content : null}
            </Content>
        </Background>
    );
};
