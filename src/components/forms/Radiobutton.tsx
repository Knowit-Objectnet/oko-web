import * as React from 'react';
import { Radio, RadioProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface Props {
    name: string;
    label: string;
}

export const Radiobutton: React.FC<Props & RadioProps> = ({ label, name, ...props }) => {
    const { register } = useFormContext();

    return (
        <Radio {...props} {...register(name)}>
            {label}
        </Radio>
    );
};
