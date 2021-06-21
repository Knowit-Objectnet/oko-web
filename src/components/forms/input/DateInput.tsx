import * as React from 'react';
import { InputProps } from '@chakra-ui/react';
import { Input, Props } from './Input';

export const DateInput: React.FC<Props & InputProps> = (props) => (
    <Input
        {...props}
        type="date"
        // TODO: for browsers that do not support date inputs
        // placeholder="åååå-mm-dd"
        // helperText="Skriv inn dato med dette formatet: åååå-mm-dd"
    />
);
