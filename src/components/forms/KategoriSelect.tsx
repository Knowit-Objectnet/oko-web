import * as React from 'react';
import { useKategorier } from '../../services/kategori/useKategorier';
import {
    CheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    HStack,
    Skeleton,
    VStack,
} from '@chakra-ui/react';
import { FormLabel } from './FormLabel';
import { Checkbox } from './Checkbox';
import { ErrorMessage } from '@hookform/error-message';

const CheckBoxGroupSkeleton: React.FC<{ loadingText?: string }> = ({ loadingText }) => (
    <VStack tabIndex={0} spacing="2" aria-label={loadingText ?? 'Laster inn valg...'} width="full">
        {[...Array(3).keys()].map((value) => (
            <HStack spacing="2" height="7" key={value} width="full">
                <Skeleton width="7" height="full" />
                <Skeleton width="full" height="full" />
            </HStack>
        ))}
    </VStack>
);

interface Props {
    name: string;
    label: string;
    helperText?: string;
    required?: boolean;
}

export const KategoriSelect: React.FC<Props> = ({ name, label, required, helperText }) => {
    const { data: kategorier, isLoading, isLoadingError } = useKategorier({ queryOptions: { keepPreviousData: true } });

    const getKategoriCheckBoxes = () => {
        if (isLoading) {
            return <CheckBoxGroupSkeleton loadingText="Laster inn kategorier..." />;
        }
        if (isLoadingError) {
            return 'Noe gikk galt, klarte ikke å laste inn kategorier. Vennligst forsøk å lukke skjemaet og åpne det på nytt.';
        }
        if (kategorier && kategorier.length < 1) {
            return 'Fant ingen kategorier å velge mellom.';
        }

        return (kategorier || [])
            .sort((kategoriA, kategoriB) => kategoriA.navn.localeCompare(kategoriB.navn))
            .map((kategori) => <Checkbox key={kategori.id} value={kategori.id} label={kategori.navn} name={name} />);
    };

    return (
        <FormControl>
            <fieldset>
                <FormLabel as="legend" label={label} required={required} />
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <CheckboxGroup>{getKategoriCheckBoxes()}</CheckboxGroup>
                <FormErrorMessage>
                    <ErrorMessage name={name} />
                </FormErrorMessage>
            </fieldset>
        </FormControl>
    );
};
