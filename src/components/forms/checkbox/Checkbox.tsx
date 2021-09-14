import * as React from 'react';
import { Checkbox as ChakraCheckbox, CheckboxProps, Icon } from '@chakra-ui/react';
import CheckboxIcon from '../../../assets/Checkbox.svg';
import { ChangeEvent, LegacyRef, useEffect, useState } from 'react';

const CustomCheckboxIcon: React.FC<IconProps> = ({ show = true }) => (
    <Icon as={CheckboxIcon} color={show ? 'currentColor' : 'transparent'} />
);

interface Props {
    name: string;
    value: string;
    label: string;
}

interface IconProps {
    show?: boolean;
}

export const Checkbox: React.FC<Props & CheckboxProps> = ({ label, ...props }) => {
    const [isChecked, setIsChecked] = useState(props.isChecked);
    const onChange = (event: ChangeEvent) => {
        setIsChecked((event.target as HTMLInputElement).checked);
    };
    const ref: LegacyRef<HTMLInputElement> = React.createRef();

    useEffect(() => {
        setIsChecked(ref.current?.checked);
    }, []);

    return (
        <ChakraCheckbox ref={ref} icon={<CustomCheckboxIcon show={isChecked} />} onChange={onChange} {...props}>
            {label}
        </ChakraCheckbox>
    );
};
