import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { ApiAarsak } from '../../services/aarsak/AarsakService';
import { EditButton } from '../../components/buttons/EditButton';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    aarsak: ApiAarsak;
}

export const EditAarsakButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ aarsak, ...props }) => {
    const { url } = useRouteMatch();
    const history = useHistory();

    const onClick = () => history.push(`${url}/rediger?aarsakId=${aarsak.id}`, { aarsak: aarsak });

    return (
        <EditButton
            label="Rediger"
            borderRadius="6"
            size="xs"
            aria-label="Rediger informasjon"
            onClick={onClick}
            {...props}
        />
    );
};
