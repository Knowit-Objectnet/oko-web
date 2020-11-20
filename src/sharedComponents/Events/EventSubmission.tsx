import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../Button';

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    & > button:not(:last-child) {
        margin-right: 0.5rem;
    }
`;

const StyledButton = styled(Button)`
    flex-grow: 1;
    min-width: 9rem;
`;

interface Props {
    cancelText?: string;
    submitText?: string;
    onCancel: () => void;
    onSubmit: () => void;
    loading: boolean;
}

/**
 * Event submission component, cancel and submit.
 */
export const EventSubmission: React.FC<Props> = (props) => {
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
        <ButtonRow>
            <StyledButton variant="negative" name="cancelButton" onClick={onClick} text="Avbryt" />
            <StyledButton
                variant="positive"
                name="submitButton"
                onClick={onClick}
                text="Godkjenn"
                isLoading={props.loading}
            />
        </ButtonRow>
    );
};
