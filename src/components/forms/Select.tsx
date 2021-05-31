import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Icon,
    Select as ChakraSelect,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import ChevronDown from '../../assets/ChevronDown.svg';

export interface SelectOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
}

interface Props {
    name: string;
    label: string;
    options: Array<SelectOption>;
    placeholder: string;
    required?: boolean;
    helperText?: string;
}

export const Select: React.FC<Props> = ({ name, label, options, placeholder, required, helperText }) => {
    const {
        register,
        formState: { errors, isSubmitted },
    } = useFormContext();

    const isInvalid = errors[name] && isSubmitted;

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel>
                {label}
                {required ? '*' : null}
            </FormLabel>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            <ChakraSelect
                {...register(name)}
                icon={<Icon as={ChevronDown} />}
                placeholder={placeholder}
                // TODO: hack for Firefox to center the option text:
                height="12"
                // TODO: The aria-required attribute is overridden by Chakra UI - based on the `isRequired` prop
                //  on `FormControl`. We do not want to use the `isRequired` prop, because it also injects
                //  the `required` attribute on the input, which causes the browser to use native popup alerts
                //  – not our custom inline alerts. We only want the `aria-required` attribute (for accessibility), but
                //  I haven't been able to find a way to bypass the Chakra UI behaviour.
                aria-required={required}
            >
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </ChakraSelect>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
