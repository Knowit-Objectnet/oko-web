import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon, Select as ChakraSelect } from '@chakra-ui/react';
import ChevronDown from '../../assets/ChevronDown.svg';
import { FormFieldProps, FormField } from './FormField';

export interface SelectOption<TValue = string, TLabel = string> {
    value: TValue;
    label: TLabel;
}

interface Props extends FormFieldProps {
    options: Array<SelectOption>;
    placeholder: string;
}

export const Select: React.FC<Props> = ({ name, label, options, placeholder, required, helperText }) => {
    const { register } = useFormContext();

    return (
        <FormField name={name} label={label} helperText={helperText} required={required}>
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
        </FormField>
    );
};
