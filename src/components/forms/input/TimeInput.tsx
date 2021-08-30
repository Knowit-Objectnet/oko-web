import * as React from 'react';
import { InputProps } from '@chakra-ui/react';
import { Input, Props } from './Input';

export const TimeInput: React.FC<Props & InputProps> = (props) => (
    <Input
        {...props}
        defaultValue="00:00"
        type="time"
        // TODO: for browsers that do not support time inputs
        // placeholder="tt:mm"
        // helperText="Skriv inn tidspunkt med dette formatet: tt:mm"
    />
);
