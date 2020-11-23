import * as React from 'react';
import styled from 'styled-components';
import { PositiveButton } from '../buttons/PositiveButton';
import { NegativeButton } from '../buttons/NegativeButton';

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
            <NegativeButton fillWidth onClick={handleCancelClick}>
                Avbryt
            </NegativeButton>
            <PositiveButton fillWidth onClick={handleSubmitClick} isLoading={props.loading}>
                Godkjenn
            </PositiveButton>
        </ButtonRow>
    );
};
