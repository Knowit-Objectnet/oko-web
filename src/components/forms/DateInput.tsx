import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputProps,
    InputRightElement,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { FormLabel } from './FormLabel';
import Warning from '../../assets/Warning.svg';

interface Props {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
}

export const DateInput: React.FC<Props & InputProps> = ({ name, label, required, helperText, ...props }) => {
    const {
        register,
        formState: { errors, isSubmitted },
    } = useFormContext();

    const isInvalid = errors[name] && isSubmitted;

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel label={label} required={required} />
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            <InputGroup>
                <Input
                    type="date"
                    {...props}
                    {...register(name)}
                    // TODO: The aria-required attribute is overridden by Chakra UI - based on the `isRequired` prop
                    //  on `FormControl`. We do not want to use the `isRequired` prop, because it also injects
                    //  the `required` attribute on the input, which causes the browser to use native popup alerts
                    //  – not our custom ones. We only want the `aria-required` attribute (for accessibility), but
                    //  I haven't been able to find a way to bypass this.
                    aria-required={required}
                />
                {isInvalid ? (
                    <InputRightElement>
                        <FormErrorIcon as={Warning} color="primary" />
                    </InputRightElement>
                ) : null}
            </InputGroup>
            <FormErrorMessage>
                <ErrorMessage name={name} />
            </FormErrorMessage>
        </FormControl>
    );
};
