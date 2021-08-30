import * as React from 'react';
import { InputProps } from '@chakra-ui/react';
import { Input, Props } from './Input';

const date = new Date();
const getTwoDigits = (value: number) => (value < 10 ? `0${value}` : value);
const hours = getTwoDigits(date.getHours());
const mins = getTwoDigits(date.getMinutes());

export const TimeInput: React.FC<Props & InputProps> = (props) => (
    <Input
        {...props}
        type="time"
        defaultValue={`${hours}:${mins}`}
        // TODO: for browsers that do not support time inputs
        // placeholder="tt:mm"
        // helperText="Skriv inn tidspunkt med dette formatet: tt:mm"
    />
);
