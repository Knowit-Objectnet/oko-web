import * as React from 'react';
import { useKategorier } from '../../services/kategori/useKategorier';
import { CheckboxGroup, FormControl, FormErrorMessage, FormHelperText, HStack } from '@chakra-ui/react';
import { FormLabel } from './FormLabel';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { Checkbox } from './checkbox/Checkbox';
import { CheckboxGroupSkeleton } from './checkbox/CheckboxGroupSkeleton';

interface Props {
    name: string;
    label: string;
    helperText?: string;
    required?: boolean;
}

export const KategoriSelect: React.FC<Props> = ({ name, label, required, helperText }) => {
    const {
        formState: { errors, isSubmitted },
    } = useFormContext();

    const { data: kategorier, isLoading, isLoadingError } = useKategorier({ queryOptions: { keepPreviousData: true } });

    const isInvalid = errors[name] && isSubmitted;

    const getKategoriCheckBoxes = () => {
        if (isLoading) {
            return <CheckboxGroupSkeleton loadingText="Laster inn kategorier..." />;
        }
        if (isLoadingError) {
            return 'Noe gikk galt, klarte ikke å laste inn kategorier. Vennligst forsøk å lukke skjemaet og åpne det på nytt.';
        }
        if (kategorier && kategorier.length < 1) {
            return 'Fant ingen kategorier å velge mellom.';
        }

        const sortedKategorier = (kategorier || []).sort((kategoriA, kategoriB) =>
            kategoriA.navn.localeCompare(kategoriB.navn),
        );

        return (
            <HStack spacing="0">
                {sortedKategorier.map((kategori) => (
                    <Checkbox
                        key={kategori.id}
                        value={kategori.id}
                        label={kategori.navn}
                        name={name}
                        isInvalid={isInvalid}
                    />
                ))}
            </HStack>
        );
    };

    return (
        <FormControl isInvalid={isInvalid}>
            <fieldset>
                <FormLabel as="legend" label={label} required={required} />
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <CheckboxGroup>{getKategoriCheckBoxes()}</CheckboxGroup>
            </fieldset>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
