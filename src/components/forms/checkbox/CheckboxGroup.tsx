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

export interface CheckboxOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
}

interface Props {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
    options?: Array<CheckboxOption>;
    /** Component to display as placeholder for the checkbox list, e.g. while waiting for dynamically loaded options **/
    optionsPlaceholder?: React.ReactNode;
}

export const CheckboxGroup: React.FC<Props> = ({ name, label, options, required, helperText, optionsPlaceholder }) => {
    const {
        field: { onChange, value },
        formState: { errors, isSubmitted },
    } = useController({ name });

    const isInvalid = errors[name] && isSubmitted;

    const getCheckboxes = () =>
        options?.map(({ value, label: checkboxLabel }) => (
            <Checkbox key={value} value={value} label={checkboxLabel} name={name} isInvalid={isInvalid} />
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
