import * as React from 'react';
import styled from 'styled-components';

const Submission = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.button`
    background-color: ${(props) => props.color};
    border-radius: 5px;
    border: none;
    width: 108px;
    height: 47px;
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;
    line-height: 13px;
    color: #000000;

    &:first-child {
        margin-right: 95px;
    }
`;

interface EventSubmissionProps {
    cancelText?: string;
    submitText?: string;
    onCancel: () => void;
    onSubmit: () => void;
}

/**
 * Event submission component, cancel and submit.
 */
export const EventSubmission: React.FC<EventSubmissionProps> = (props) => {
    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.persist();
        switch (e.currentTarget.name) {
            case 'cancelButton': {
                props.onCancel();
                break;
            }
            case 'submitButton': {
                props.onSubmit();
                break;
            }
        }
    };

    return (
        <Submission>
            <Button color="#EC7070" name="cancelButton" onClick={onClick}>
                {props.cancelText || 'Avbryt'}
            </Button>
            <Button color="#52CC91" name="submitButton" onClick={onClick}>
                {props.submitText || 'Godkjenn'}
            </Button>
        </Submission>
    );
};
