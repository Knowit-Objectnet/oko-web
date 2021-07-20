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

    console.log(errors);

    const iterate = (obj: { [key: string]: any }): string[] => {
        let messages: string[] = [];
        Object.keys(obj).forEach((key) => {
            if (!key.localeCompare('ref')) console.log('Damn ref', key);
            else if (typeof obj[key] === 'object') {
                const nestedMessages = iterate(obj[key]);
                messages = messages.concat(nestedMessages);
            } else if (key === 'message') {
                messages.push(obj[key]);
            }
        });
        return messages;
    };

    const errorMessages = iterate(errors);
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
