import * as React from 'react';
import { StasjonSelect } from '../../../../components/forms/StasjonSelect';
import { useStasjonById } from '../../../../services/stasjon/useStasjonById';
import { FormInfoHeading, FormInfoSection } from '../../../../components/forms/FormInfoSection';
import { FormField } from '../../../../components/forms/FormField';

interface Props {
    stasjonId?: string;
}

const StasjonInfo: React.FC<Required<Props>> = ({ stasjonId }) => {
    const { data: stasjon, isLoading, isLoadingError } = useStasjonById(stasjonId);

    const getStasjonNavn = (): string => {
        if (isLoading) {
            return 'Vennligst vent...';
        }
        if (stasjon && !isLoadingError) {
            return stasjon.navn;
        }
        return 'Klarte ikke hente navn på stasjonen';
    };

    return (
        <FormField name="stasjonId" label="Stasjon">
            <FormInfoSection>
                <FormInfoHeading>{getStasjonNavn()}</FormInfoHeading>
            </FormInfoSection>
        </FormField>
    );
};

export const HenteplanFormStasjon: React.FC<Props> = ({ stasjonId }) =>
    stasjonId ? (
        <StasjonInfo stasjonId={stasjonId} />
    ) : (
        <StasjonSelect name="stasjonId" label="Stasjon" helperText="Hvilken stasjon skal det hentes fra?" required />
    );
