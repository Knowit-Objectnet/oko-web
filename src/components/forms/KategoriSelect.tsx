import * as React from 'react';
import { useKategorier } from '../../services/kategori/useKategorier';
import { CheckboxGroup, CheckboxOption } from './checkbox/CheckboxGroup';
import { ListSkeleton } from './checkbox/ListSkeleton';
import { WarningBody, WarningContainer, WarningTitle } from './Warning';
import { FormFieldProps } from './FormField';

export const KategoriSelect: React.FC<FormFieldProps> = ({ name, ...props }) => {
    const { data: kategorier, isLoading, isLoadingError } = useKategorier();

    const getLoadingPlaceholder = (): React.ReactNode => {
        if (isLoading) {
            return <ListSkeleton loadingText="Laster inn kategorier..." />;
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

    const getKategoriCheckBoxes = (): Array<CheckboxOption> =>
        (kategorier || []).map((kategori) => ({
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
