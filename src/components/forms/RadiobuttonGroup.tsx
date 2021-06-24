import * as React from 'react';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    Radio,
    RadioGroup as ChakraRadioGroup,
    VStack,
} from '@chakra-ui/react';
import { FormLabel } from './FormLabel';
import { ErrorMessage } from '@hookform/error-message';
import { useController } from 'react-hook-form';

export interface RadioOption<TValue = string, TLabel = string> {
    label: TLabel;
    value: TValue;
}

interface Props {
    label: string;
    name: string;
    options: Array<RadioOption>;
    required?: boolean;
    helperText?: string;
}

export const RadiobuttonGroup: React.FC<Props> = ({ label, name, options, required, helperText }) => {
    const {
        field: { onChange, value },
        formState: { errors, isSubmitted },
    } = useController({ name });

    const isInvalid = errors[name] && isSubmitted;

    return (
        <FormControl isInvalid={isInvalid}>
            <fieldset>
                <FormLabel as="legend" label={label} required={required} />
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <ChakraRadioGroup onChange={onChange} value={value}>
                    <VStack spacing="0">
                        {options.map(({ value, label: optionLabel }) => (
                            <Radio key={value} name={name} value={value}>
                                {optionLabel}
                            </Radio>
                        ))}
                    </VStack>
                </ChakraRadioGroup>
            </fieldset>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
