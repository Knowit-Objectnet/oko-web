import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { AvtaleForm } from './AvtaleForm';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    avtale: ApiAvtale;
}

export const EditAvtaleButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ avtale, ...props }) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () => history.push(`${url}/rediger?avtaleId=${avtale.id}`, { avtaleToEdit: avtale, callback: url });

    return <EditButton label="Rediger avtale" borderRadius="6" {...props} onClick={onClick} />;
};
