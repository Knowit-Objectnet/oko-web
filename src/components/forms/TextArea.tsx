import * as React from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { FormFieldProps, FormField } from './FormField';

export const TextArea: React.FC<FormFieldProps & TextareaProps> = ({ name, label, required, helperText, ...props }) => {
    const { register } = useFormContext();

    return (
        <FormField name={name} label={label} helperText={helperText} required={required}>
            <Textarea
                {...props}
                {...register(name)}
                // TODO: The aria-required attribute is overridden by Chakra UI - based on the `isRequired` prop
                //  on `FormControl`. We do not want to use the `isRequired` prop, because it also injects
                //  the `required` attribute on the input, which causes the browser to use native popup alerts
                //  – not our custom ones. We only want the `aria-required` attribute (for accessibility), but
                //  I haven't been able to find a way to bypass this.
                aria-required={required}
            />
        </FormField>
    );
};
