import * as React from 'react';
import { FormControl, FormErrorMessage, RadioGroup as ChakraRadioGroup, Stack } from '@chakra-ui/react';
import { FormLabel } from './FormLabel';
import { Radiobutton } from './Radiobutton';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

export interface RadioOption<TValue = string, TLabel = string> {
    label: TLabel;
    value: TValue;
}

interface Props {
    label: string;
    name: string;
    options: Array<RadioOption>;
    required?: boolean;
}

export const RadiobuttonGroup: React.FC<Props> = ({ label, name, options, required }) => {
    const {
        formState: { errors, isSubmitted },
    } = useFormContext();

    const isInvalid = errors[name] && isSubmitted;

    return (
        <FormControl isInvalid={isInvalid}>
            <fieldset>
                <FormLabel as="legend" label={label} required={required} />
                <ChakraRadioGroup>
                    <Stack direction="column" spacing="0">
                        {options.map(({ value, label: radioLabel }) => (
                            <Radiobutton name={name} key={value} value={value} label={radioLabel} />
                        ))}
                    </Stack>
                </ChakraRadioGroup>
            </fieldset>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
