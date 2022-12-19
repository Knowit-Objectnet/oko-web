import * as React from 'react';
import { FormFieldProps } from './FormField';
import { usePartnere } from '../../services/partner/usePartnere';
import { ListSkeleton } from './checkbox/ListSkeleton';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';
import { CheckboxGroup, CheckboxOption } from './checkbox/CheckboxGroup';
import { ApiPartner } from '../../services/partner/PartnerService';

interface Props {
    existingPartnere?: string[];
    disableExisting?: boolean;
}

export const PartnerSelectMultiple: React.FC<FormFieldProps & Props> = ({
    disableExisting = false,
    existingPartnere = [],
    ...props
}) => {
    const { data: partnere, isLoading, isLoadingError } = usePartnere({ params: { includeAvtaler: true } });

    const sortFilteredItems = (a: ApiPartner, b: ApiPartner): number => {
        if (a.navn[0] === '*') {
            return 1;
        } else if (b.navn[0] === '*') {
            return -1;
        } else {
            return 0;
        }
    };

    const today = new Date();
    const filteredPartners = partnere
        ?.sort(sortFilteredItems)
        .filter((value) => value.avtaler.some((avtale) => new Date(avtale.sluttDato) >= today));

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
        if (filteredPartners && filteredPartners.length < 1) {
            return 'Fant ingen partnere å velge mellom.';
        }
        return null;
    };

    const getPartnerCheckBoxes = (): Array<CheckboxOption> =>
        (filteredPartners || []).map((partner) => ({
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
