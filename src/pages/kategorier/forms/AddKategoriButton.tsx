import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { useHistory } from 'react-router-dom';

export const AddKategoriButton: React.FC<Omit<ButtonProps, 'onClick'>> = (props) => {
    const history = useHistory();

    const onClick = () => history.push(`/kategorier/ny`);

    return (
        <Button
            borderRadius="6"
            aria-label="Opprett ny kategori"
            leftIcon={<Icon as={Plus} />}
            {...props}
            onClick={onClick}
        >
            Legg til kategori
        </Button>
    );
};
