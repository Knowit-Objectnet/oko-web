import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import NyttVindu from '../../assets/NyttVindu.svg';
import { useHistory } from 'react-router-dom';

interface Props {
    kontakt: ApiKontakt;
}

export const OpenVerifiseringPageButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/partnere/kontakt/verifiser?kontaktId=${kontakt.id}`, { kontakt: kontakt });

    return (
        <Button
            leftIcon={<Icon as={NyttVindu} />}
            borderRadius="6"
            aria-label={`Verifiser kontaktinformasjon for ${kontakt.navn}`}
            {...props}
            onClick={onClick}
        >
            Verifiser
        </Button>
    );
};
