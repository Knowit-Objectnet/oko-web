import * as React from 'react';
import { useKategorier } from '../../services/kategori/useKategorier';
import { CheckboxGroup, CheckboxOption } from './checkbox/CheckboxGroup';
import { CheckboxGroupSkeleton } from './checkbox/CheckboxGroupSkeleton';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';
import { FormFieldProps } from './FormField';
import { kategorierSorted } from '../kategorier/kategorierSorted';

export const KategoriSelect: React.FC<FormFieldProps> = ({ name, ...props }) => {
    const { data: kategorier, isLoading, isLoadingError } = useKategorier({ queryOptions: { keepPreviousData: true } });

    const getLoadingPlaceholder = (): React.ReactNode => {
        if (isLoading) {
            return <CheckboxGroupSkeleton loadingText="Laster inn kategorier..." />;
        }
        if (isLoadingError) {
            return (
                <WarningContainer variant="warning">
                    <WarningTitle title="Noe gikk galt, klarte ikke å laste inn kategorier." />
                    <WarningBody>
                        Vennligst forsøk å lukke skjemaet og åpne det på nytt. Du kan fortsatt lagre henteplanen, men
                        ingen kategorier vil bli registrert.
                    </WarningBody>
                </WarningContainer>
            );
        }
        if (kategorier && kategorier.length < 1) {
            return 'Fant ingen kategorier å velge mellom.';
        }
        return null;
    };

    const sortedKategorier = kategorierSorted(kategorier || []);

    const getKategoriCheckBoxes = (): Array<CheckboxOption> =>
        sortedKategorier.map((kategori) => ({
            value: kategori.id,
            label: kategori.navn,
        }));

    return (
        <CheckboxGroup
            name={name}
            options={getKategoriCheckBoxes()}
            optionsPlaceholder={getLoadingPlaceholder()}
            {...props}
        />
    );
};
