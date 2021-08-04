import * as React from 'react';
import { useAarsaker } from '../../services/aarsak/useAarsaker';
import { ListSkeleton } from './checkbox/ListSkeleton';
import { FormFieldProps } from './FormField';
import { RadiobuttonGroup, RadioOption } from './RadiobuttonGroup';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';

export const AarsakSelect: React.FC<FormFieldProps> = ({ name, ...props }) => {
    const { data: aarsaker, isLoading, isLoadingError } = useAarsaker({ queryOptions: { keepPreviousData: true } });

    const getLoadingPlaceholder = (): React.ReactNode => {
        if (isLoading) {
            return <ListSkeleton loadingText="Laster inn avlysningsårsaker..." />;
        }
        if (isLoadingError) {
            return (
                <WarningContainer variant="warning">
                    <WarningTitle title="Noe gikk galt, klarte ikke å laste inn avlysningsårsaker." />
                    <WarningBody>Vennligst forsøk å lukke skjemaet og åpne det på nytt.</WarningBody>
                </WarningContainer>
            );
        }
        if (aarsaker && aarsaker.length < 1) {
            return 'Fant ingen avlysningsårsaker å velge mellom.';
        }
        return null;
    };

    const getAarsakRadiobuttons = (): Array<RadioOption> =>
        (aarsaker || []).map((aarsak) => ({
            value: aarsak.id,
            label: aarsak.beskrivelse,
        }));

    return (
        <RadiobuttonGroup
            name={name}
            options={getAarsakRadiobuttons()}
            optionsPlaceholder={getLoadingPlaceholder()}
            {...props}
        />
    );
};
