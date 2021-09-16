import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { AddButton } from '../../../components/buttons/AddButton';
import { useHistory } from 'react-router-dom';

export const AddPartnerButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const history = useHistory();

    const onClick = () => history.push('/partnere/ny');

    return <AddButton label="Legg til samarbeidspartner" borderRadius="6" {...props} onClick={onClick} />;
};
