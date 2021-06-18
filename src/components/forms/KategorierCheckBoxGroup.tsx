import * as React from 'react';
import { CheckboxGroup } from './CheckboxGroup';
import { useKategorier } from '../../services/kategori/useKategorier';

interface Props {
    label: string;
    helperText?: string;
    required?: boolean;
}

export const KategorierCheckBoxGroup: React.FC<Props> = (props) => {
    const { data: kategorier, isLoading, isLoadingError } = useKategorier({ queryOptions: { keepPreviousData: true } });

    const sortedKategorier = (kategorier || []).sort((kategoriA, kategoriB) =>
        kategoriA.navn.localeCompare(kategoriB.navn),
    );

    return (
        <CheckboxGroup
            options={sortedKategorier.map((kategori) => ({
                name: kategori.id,
                label: kategori.navn,
            }))}
            isLoading={isLoading}
            {...props}
        />
    );
};
