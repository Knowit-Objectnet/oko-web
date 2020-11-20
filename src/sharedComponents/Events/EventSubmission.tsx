import * as React from 'react';
import styled from 'styled-components';
import { Button } from '../buttons/Button';

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
            <StyledButton variant="negative" onClick={handleCancelClick}>
                Avbryt
            </StyledButton>
            <StyledButton variant="positive" onClick={handleSubmitClick} isLoading={props.loading}>
                Godkjenn
            </StyledButton>
        </ButtonRow>
    );
};
