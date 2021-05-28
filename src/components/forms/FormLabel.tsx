import * as React from 'react';
import { FormLabel as ChakraFormLabel } from '@chakra-ui/react';

interface Props {
    label: string;
    required?: boolean;
}

export const FormLabel: React.FC<Props> = ({ label, required }) => (
    <ChakraFormLabel>
        {label}
        {required ? <span aria-label=", obligatorisk felt">*</span> : null}
    </ChakraFormLabel>
);
