import * as React from 'react';
import { useStasjoner } from '../../services/stasjon/useStasjoner';
import { Select, SelectOption } from './Select';

interface Props {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
}

export const StasjonSelect: React.FC<Props> = (props) => {
    const { data: stasjoner, isLoading, isLoadingError } = useStasjoner({ queryOptions: { keepPreviousData: true } });

    const stasjonOptions: Array<SelectOption> = (stasjoner ?? []).map((stasjon) => ({
        label: stasjon.navn,
        value: stasjon.id,
    }));

    const getPlaceholderValue = (): string => {
        if (isLoading) {
            return 'Laster inn...';
        }
        if (isLoadingError) {
            return 'Klarte ikke hente stasjoner';
        }
        return 'Velg stasjon';
    };

    return <Select options={stasjonOptions} placeholder={getPlaceholderValue()} {...props} />;
};
