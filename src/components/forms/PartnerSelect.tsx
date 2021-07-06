import * as React from 'react';
import { useStasjoner } from '../../services/stasjon/useStasjoner';
import { Select, SelectOption } from './Select';
import { FormFieldProps } from './FormField';
import { usePartnere } from '../../services/partner/usePartnere';
import { CheckboxGroupSkeleton } from './checkbox/CheckboxGroupSkeleton';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';
import { CheckboxGroup, CheckboxOption } from './checkbox/CheckboxGroup';

export const PartnerSelectMultiple: React.FC<FormFieldProps> = (props) => {
    const { data: partnere, isLoading, isLoadingError } = usePartnere({ queryOptions: { keepPreviousData: true } });

    const partnerOptions: Array<SelectOption> = (partnere ?? []).map((partner) => ({
        label: partner.navn,
        value: partner.id,
    }));

    const getLoadingPlaceholder = (): React.ReactNode => {
        if (isLoading) {
            return <CheckboxGroupSkeleton loadingText="Laster inn partnere..." />;
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
        }));

    return <CheckboxGroup options={getPartnerCheckBoxes()} optionsPlaceholder={getLoadingPlaceholder()} {...props} />;
};
