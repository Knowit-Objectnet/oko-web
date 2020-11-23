import * as React from 'react';
import styled from 'styled-components';
import { NegativeButton, PositiveButton } from '../buttons/Buttons';

const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    & > button {
        flex-grow: 1;
        min-width: 9rem;
    }

    & > button:not(:last-child) {
        margin-right: 0.5rem;
    }
`;

interface Props {
    onCancel: () => void;
    onSubmit: () => void;
    loading: boolean;
}

export const EventSubmission: React.FC<Props> = (props) => {
    const handleCancelClick = (event: React.MouseEvent) => {
        event.persist();
        props.onCancel();
    };

    const handleSubmitClick = (event: React.MouseEvent) => {
        event.persist();
        props.onSubmit();
    };

    return (
        <ButtonRow>
            <NegativeButton onClick={handleCancelClick}>Avbryt</NegativeButton>
            <PositiveButton onClick={handleSubmitClick} isLoading={props.loading}>
                Godkjenn
            </PositiveButton>
        </ButtonRow>
    );
};
