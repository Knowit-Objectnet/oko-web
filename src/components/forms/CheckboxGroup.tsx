import * as React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup, FormControl } from '@chakra-ui/react';
import { Checkbox } from './Checkbox';
import { FormLabel } from './FormLabel';

export interface CheckboxOption<TName = string, TLabel = string> {
    name: TName;
    label: TLabel;
}

interface Props {
    label: string;
    options: Array<CheckboxOption>;
    required?: boolean;
}

export const CheckboxGroup: React.FC<Props> = ({ label, options, required }) => (
    <FormControl>
        <fieldset>
            <FormLabel as="legend" label={label} required={required} />
            <ChakraCheckboxGroup>
                {options.map(({ name: checkboxName, label: checkboxLabel }) => (
                    <Checkbox key={checkboxName} name={checkboxName} label={checkboxLabel} />
                ))}
            </ChakraCheckboxGroup>
        </fieldset>
    </FormControl>
);
