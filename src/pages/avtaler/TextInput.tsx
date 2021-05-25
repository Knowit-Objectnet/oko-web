import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

interface Props {
    name: string;
    label: string;
    helperText?: string;
}

export const TextInput: React.FC<Props> = ({ name, label, helperText }) => {
    const {
        register,
        formState: { errors, isSubmitted },
    } = useFormContext();

    return (
        <FormControl id={name} isInvalid={errors[name] && isSubmitted}>
            <FormLabel>{label}</FormLabel>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            <Input type="text" {...register(name)} />
            <FormErrorMessage>
                <ErrorMessage name={name} errors={errors} />
            </FormErrorMessage>
        </FormControl>
    );
};
