import * as React from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { useKategorier } from '../../services/kategori/useKategorier';

interface Props {
    name: string;
    label: string;
    helperText?: string;
    required?: boolean;
}

export const KategorierCheckBoxGroup: React.FC<Props> = ({ name, ...props }) => {
    const { data: kategorier, isLoading, isLoadingError } = useKategorier({ queryOptions: { keepPreviousData: true } });

    const sortedKategorier = (kategorier || []).sort((kategoriA, kategoriB) =>
        kategoriA.navn.localeCompare(kategoriB.navn),
    );

    return (
        <CheckboxGroup
            options={sortedKategorier.map((kategori) => ({
                value: kategori.id,
                label: kategori.navn,
            }))}
            name={name}
            isLoading={isLoading}
            {...props}
        />
    );
};
