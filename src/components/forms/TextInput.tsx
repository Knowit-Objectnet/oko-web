import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import {
    FormControl,
    FormErrorIcon,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import Warning from '../../assets/Warning.svg';
import { FormLabel } from './FormLabel';

interface Props {
    name: string;
    label: string;
    required?: boolean;
    helperText?: string;
}

export const TextInput: React.FC<Props> = ({ name, label, required, helperText }) => {
    const {
        register,
        formState: { errors, isSubmitted },
    } = useFormContext();

    const isInvalid = errors[name] && isSubmitted;

    return (
        <FormControl id={name} isInvalid={isInvalid}>
            <FormLabel label={label} required={required} />
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            <InputGroup>
                <Input
                    type="text"
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
