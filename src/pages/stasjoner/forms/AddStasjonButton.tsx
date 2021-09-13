import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { useHistory } from 'react-router-dom';

export const AddStasjonButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const history = useHistory();

    const onClick = () => history.push(`/stasjoner/ny`);

    return (
        <Button leftIcon={<Icon as={Plus} />} {...props} onClick={onClick}>
            Legg til stasjon
        </Button>
    );
};
