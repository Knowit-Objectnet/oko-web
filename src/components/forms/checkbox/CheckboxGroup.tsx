import * as React from 'react';
import {
    CheckboxGroup as ChakraCheckboxGroup,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    VStack,
} from '@chakra-ui/react';
import { Checkbox } from './Checkbox';
import { FormLabel } from '../FormLabel';
import { ErrorMessage } from '@hookform/error-message';
import { useController } from 'react-hook-form';
import { FormFieldProps } from '../FormField';

export interface CheckboxOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
    disabled?: boolean;
}

interface Props<TValue = string, TLabel = string> extends FormFieldProps {
    defaultValues?: TValue[];
    options?: Array<CheckboxOption<TValue, TLabel>>;
    /** Component to display as placeholder for the checkbox list, e.g. while waiting for dynamically loaded options **/
    optionsPlaceholder?: React.ReactNode;
}

export const CheckboxGroup: React.FC<Props> = ({
    name,
    label,
    options,
    required,
    helperText,
    optionsPlaceholder,
    defaultValues,
}) => {
    const {
        field: { onChange, value },
        formState: { errors, isSubmitted },
    } = useController({ name, defaultValue: defaultValues });

    const isInvalid = errors[name] && isSubmitted;

    const getCheckboxes = () =>
        options?.map(({ value, label: checkboxLabel, disabled: checkboxDisabled }) => (
            <Checkbox
                key={value}
                value={value}
                label={checkboxLabel}
                name={name}
                isDisabled={checkboxDisabled}
                isInvalid={isInvalid}
            />
        ));

    return (
        <FormControl isInvalid={isInvalid}>
            <fieldset>
                <FormLabel as="legend" label={label} required={required} />
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <ChakraCheckboxGroup onChange={onChange} value={value}>
                    {optionsPlaceholder || <VStack spacing="0">{getCheckboxes()}</VStack>}
                </ChakraCheckboxGroup>
            </fieldset>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
