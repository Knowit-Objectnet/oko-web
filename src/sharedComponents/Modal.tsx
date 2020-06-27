import * as React from 'react';
import styled from 'styled-components';
import { Cross } from '@styled-icons/icomoon/Cross';

const Background = styled.div`
    z-index: 1000;
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

interface styledContentProps {
    width?: number;
    maxWidth?: number;
    minWidth?: number;
    height?: number;
    maxHeight?: number;
    minHeight?: number;
}

const Content = styled.div<styledContentProps>`
    position: relative;
    z-index: 1001;
    background-color: white;
    width: ${(props) => props.width};
    max-width: ${(props) => props.maxWidth};
    min-width: ${(props) => props.minWidth};
    height: ${(props) => props.height};
    max-height: ${(props) => props.maxHeight};
    min-height: ${(props) => props.minHeight};
    border-radius: 6px;
    overflow: auto;
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
export const Modal: React.FC<ModalProps> = (props) => {
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
                <StyledCross size="1em" onClick={onExitClick} />
                {props.content ? props.content instanceof String ? <p>{props.content}</p> : props.content : null}
            </Content>
        </Background>
    );
};
