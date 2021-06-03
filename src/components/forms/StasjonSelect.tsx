import * as React from 'react';
import { useStasjoner } from '../../services/stasjon/useStasjoner';
import { useFormContext } from 'react-hook-form';
import { Select, SelectOption } from './Select';

interface Props {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
}

export const StasjonSelect: React.FC<Props> = (props) => {
    const { data: stasjoner, isLoading, isLoadingError } = useStasjoner();

    const { register } = useFormContext();

    const stasjonOptions: Array<SelectOption> = (stasjoner ?? []).map((stasjon) => ({
        label: stasjon.navn,
        value: stasjon.id,
    }));

    return <Select options={stasjonOptions} placeholder="Velg stasjon" {...props} />;
};
