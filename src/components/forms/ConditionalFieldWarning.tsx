import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';

interface WarningMessage {
    title: string;
    body: string;
}

interface Props {
    fieldName: string;
    warningCheckFn: (fieldValue: string) => boolean;
    warningMessage: (fieldValue: string) => WarningMessage;
}

export const ConditionalFieldWarning: React.FC<Props> = ({ fieldName, warningCheckFn, warningMessage }) => {
    const { watch } = useFormContext();
    const [warning, setWarning] = useState<WarningMessage>();

    const editedFieldValue = watch(fieldName);

    useEffect(() => {
        const shouldShowWarning = warningCheckFn(editedFieldValue);
        if (shouldShowWarning) {
            setWarning(warningMessage(editedFieldValue));
        } else {
            setWarning(undefined);
        }
    }, [editedFieldValue, warningCheckFn, warningMessage]);

    return warning ? (
        <WarningContainer variant="warning">
            <WarningTitle title={warning.title} />
            <WarningBody>{warning.body}</WarningBody>
        </WarningContainer>
    ) : null;
};
