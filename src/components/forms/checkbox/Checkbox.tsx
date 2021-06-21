import * as React from 'react';
import { Checkbox as ChakraCheckbox, CheckboxProps, Icon } from '@chakra-ui/react';
import CheckboxIcon from '../../../assets/Checkbox.svg';
import { useFormContext } from 'react-hook-form';

const CustomCheckboxIcon: React.FC = () => (
    <Icon fill="currentColor">
        <CheckboxIcon />
    </Icon>
);

interface Props {
    name: string;
    value: string;
    label: string;
}

export const Checkbox: React.FC<Props & CheckboxProps> = ({ label, name, ...props }) => {
    const { register } = useFormContext();

    return (
        <ChakraCheckbox icon={<CustomCheckboxIcon />} {...props} {...register(name)}>
            {label}
        </ChakraCheckbox>
    );
};
