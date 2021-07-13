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
import { FormFieldProps } from './FormField';

export interface RadioOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
}

interface Props<TValue = string, TLabel = string> extends FormFieldProps {
    defaultValues?: TValue[];
    options?: Array<RadioOption<TValue, TLabel>>;
    /** Component to display as placeholder for the radio list, e.g. while waiting for dynamically loaded options **/
    optionsPlaceholder?: React.ReactNode;
}

export const RadiobuttonGroup: React.FC<Props> = ({
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

    const getRadiobuttons = () =>
        options?.map(({ value, label: RadiobuttonLabel }) => (
            <Radio key={value} value={value} name={name} isInvalid={isInvalid}>
                {' '}
                {RadiobuttonLabel}{' '}
            </Radio>
        ));

    return (
        <FormControl isInvalid={isInvalid}>
            <fieldset>
                <FormLabel as="legend" label={label} required={required} />
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
                <ChakraRadioGroup onChange={onChange} value={value}>
                    {optionsPlaceholder || <VStack spacing="0">{getRadiobuttons()}</VStack>}
                </ChakraRadioGroup>
            </fieldset>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
