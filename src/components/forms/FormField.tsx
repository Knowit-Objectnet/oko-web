import * as React from 'react';
import { FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormLabel } from './FormLabel';
import { ErrorMessage } from '@hookform/error-message';

export interface FormFieldProps {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
}

type FormFieldRenderProp = (fieldProps: { isInvalid: boolean }) => React.ReactNode;

interface Props extends FormFieldProps {
    children?: React.ReactNode | FormFieldRenderProp;
}

export const FormField: React.FC<Props> = ({ name, label, required, helperText, children }) => {
    const {
        formState: { errors, isSubmitted },
    } = useFormContext();

    const isInvalid = errors[name] && isSubmitted;

    const renderFormField = () => {
        if (typeof children === 'function') {
            return children({ isInvalid });
        }
        return children;
    };

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel label={label} required={required} />
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            {renderFormField()}
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
