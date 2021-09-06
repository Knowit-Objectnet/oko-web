import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { EditHenteplanForm } from './form/EditHenteplanForm';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    avtale: ApiAvtale;
    henteplan: ApiHenteplan;
}

export const EditHenteplanButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({
    henteplan,
    avtale,
    ...props
}) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () =>
        history.push(`${url}/henteplan/rediger?henteplanId=${henteplan.id}`, {
            henteplan: henteplan,
            avtale: avtale,
            callback: url,
        });

    return (
        <EditButton label="Rediger" borderRadius="6" aria-label="Rediger henteplanen" {...props} onClick={onClick} />
    );
};
