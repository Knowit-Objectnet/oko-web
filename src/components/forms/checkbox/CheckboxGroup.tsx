import * as React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react';
import { Checkbox } from './Checkbox';
import { FormLabel } from '../FormLabel';
import { ErrorMessage } from '@hookform/error-message';

export interface CheckboxOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
}

interface Props {
    name: string;
    label: string;
    options: Array<CheckboxOption>;
    required?: boolean;
    helperText?: string;
}

export const CheckboxGroup: React.FC<Props> = ({ name, label, options, required, helperText }) => (
    <FormControl>
        <fieldset>
            <FormLabel as="legend" label={label} required={required} />
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            <ChakraCheckboxGroup>
                {options.map(({ value, label: checkboxLabel }) => (
                    <Checkbox key={value} value={value} label={checkboxLabel} name={name} />
                ))}
            </ChakraCheckboxGroup>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </fieldset>
    </FormControl>
);
