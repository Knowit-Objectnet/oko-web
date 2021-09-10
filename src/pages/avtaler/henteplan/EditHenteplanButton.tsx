import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { useHistory } from 'react-router-dom';

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

    const onClick = () =>
        history.push(`/avtaler/henteplan/rediger?henteplanId=${henteplan.id}&avtaleId=${avtale.id}`, {
            henteplan: henteplan,
            avtale: avtale,
        });

    return (
        <EditButton label="Rediger" borderRadius="6" aria-label="Rediger henteplanen" {...props} onClick={onClick} />
    );
};
