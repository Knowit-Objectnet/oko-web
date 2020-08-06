import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const Submission = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
`;

const Divider = styled.div`
    width: 40px;
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
            <Button color="Red" name="cancelButton" onClick={onClick} text="Avbryt" width={108} />
            <Divider />
            <Button color="Green" name="submitButton" onClick={onClick} text="Godkjenn" width={108} />
        </Submission>
    );
};
