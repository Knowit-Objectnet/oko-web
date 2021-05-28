import * as React from 'react';
import { CheckboxGroup as ChakraCheckboxGroup, FormControl, FormLabel } from '@chakra-ui/react';
import { Checkbox } from './Checkbox';

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
        <FormLabel>
            {label}
            {required ? '*' : null}
        </FormLabel>
        <ChakraCheckboxGroup>
            {options.map(({ name, label }) => (
                <Checkbox key={name} name={name} label={label} />
            ))}
        </ChakraCheckboxGroup>
    </FormControl>
);
