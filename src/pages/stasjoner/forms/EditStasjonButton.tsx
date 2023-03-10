import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';
import { useHistory } from 'react-router-dom';

interface Props {
    stasjon: ApiStasjon;
}

export const EditStasjonButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ stasjon, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/stasjoner/rediger?stasjonId=${stasjon.id}`, { stasjon: stasjon });

    return (
        <EditButton
            label="Rediger"
            aria-label={`Rediger informasjon for ${stasjon.navn}`}
            {...props}
            onClick={onClick}
            borderRadius="6"
        />
    );
};
