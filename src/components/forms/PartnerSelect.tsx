import * as React from 'react';
import { FormFieldProps } from './FormField';
import { usePartnere } from '../../services/partner/usePartnere';
import { ListSkeleton } from './checkbox/ListSkeleton';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';
import { CheckboxGroup, CheckboxOption } from './checkbox/CheckboxGroup';

interface Props {
    existingPartnere?: string[];
    disableExisting?: boolean;
}

export const PartnerSelectMultiple: React.FC<FormFieldProps & Props> = ({
    disableExisting = false,
    existingPartnere = [],
    ...props
}) => {
    const { data: partnere, isLoading, isLoadingError } = usePartnere();

    const getLoadingPlaceholder = (): React.ReactNode => {
        if (isLoading) {
            return <ListSkeleton loadingText="Laster inn partnere..." />;
        }
        if (isLoadingError) {
            return (
                <WarningContainer variant="warning">
                    <WarningTitle title="Noe gikk galt, klarte ikke å laste inn partnere." />
                    <WarningBody>Vennligst forsøk å lukke skjemaet og åpne det på nytt.</WarningBody>
                </WarningContainer>
            );
        }
        if (partnere && partnere.length < 1) {
            return 'Fant ingen partnere å velge mellom.';
        }
        return null;
    };

    const getPartnerCheckBoxes = (): Array<CheckboxOption> =>
        (partnere || []).map((partner) => ({
            value: partner.id,
            label: partner.navn,
            disabled: disableExisting && existingPartnere.indexOf(partner.id) >= 0,
        }));

    return (
        <CheckboxGroup
            options={getPartnerCheckBoxes()}
            optionsPlaceholder={getLoadingPlaceholder()}
            defaultValues={existingPartnere}
            {...props}
        />
    );
};
