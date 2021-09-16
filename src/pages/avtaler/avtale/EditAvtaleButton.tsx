import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { useHistory } from 'react-router-dom';

interface Props {
    avtale: ApiAvtale;
}

export const EditAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ avtale, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/avtaler/rediger?avtaleId=${avtale.id}`, { avtale: avtale });

    return <EditButton label="Rediger avtale" borderRadius="6" {...props} onClick={onClick} />;
};
