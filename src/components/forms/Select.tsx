import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Select as ChakraSelect } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

export interface SelectOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
}

interface Props {
    name: string;
    label: string;
    options: Array<SelectOption>;
    helperText?: string;
}

export const Select: React.FC<Props> = ({ name, label, options, helperText }) => {
    const {
        register,
        formState: { errors, isSubmitted },
    } = useFormContext();

    return (
        <FormControl isInvalid={errors[name] && isSubmitted}>
            <FormLabel>{label}</FormLabel>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            <ChakraSelect {...register(name)} defaultValue="-1">
                {/* TODO: add default value options to Props and utilize here */}
                <option value="-1" disabled />
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </ChakraSelect>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
