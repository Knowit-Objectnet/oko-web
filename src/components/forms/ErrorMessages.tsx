import * as React from 'react';
import { useFormState } from 'react-hook-form';
import { ListItem, UnorderedList } from '@chakra-ui/react';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';

interface Props {
    globalError?: string;
}

export const ErrorMessages: React.FC<Props> = ({ globalError }) => (
    <>
        <GlobalErrorMessage globalError={globalError} />
        <FieldErrorMessages />
    </>
);

const GlobalErrorMessage: React.FC<Props> = ({ globalError }) => {
    return globalError ? (
        <WarningContainer variant="error">
            <WarningTitle title={globalError} />
        </WarningContainer>
    ) : null;
};

const FieldErrorMessages: React.FC = () => {
    const { errors, isSubmitted } = useFormState();

    const errorMessages = Object.values(errors).map((error) => error.message);
    const formHasErrors = errorMessages.length > 0;

    return isSubmitted && formHasErrors ? (
        <WarningContainer variant="error">
            <WarningTitle title="Vennligst rett opp følgende feil i skjemaet:" />
            <WarningBody>
                <UnorderedList>
                    {errorMessages.map((message, index) => (
                        // We use the index as key here on purpose, in order to get the correct order for the errors
                        <ListItem key={index}>{message}</ListItem>
                    ))}
                </UnorderedList>
            </WarningBody>
        </WarningContainer>
    ) : null;
};
