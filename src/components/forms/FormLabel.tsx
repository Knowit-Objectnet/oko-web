import * as React from 'react';
import { FormLabel as ChakraFormLabel, FormLabelProps } from '@chakra-ui/react';

interface Props {
    label: string;
    required?: boolean;
}

export const FormLabel: React.FC<Props & FormLabelProps> = ({ label, required, ...props }) => (
    <ChakraFormLabel {...props}>
        {label}
        {required ? <span aria-label="obligatorisk felt">*</span> : null}
    </ChakraFormLabel>
);
