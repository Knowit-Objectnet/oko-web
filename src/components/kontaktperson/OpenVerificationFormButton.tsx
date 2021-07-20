import * as React from 'react';
import { Button, ButtonProps, Icon, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../Modal';
import { AddButton } from '../buttons/AddButton';
import { ApiPartner } from '../../services/partner/PartnerService';
import { KontaktPersonForm } from './KontaktPersonForm';
import { ApiStasjon } from '../../services/stasjon/StasjonService';
import { ApiKontakt } from '../../services/aktor/KontaktService';
import NyttVindu from '../../assets/NyttVindu.svg';
import { VerifiseringForm } from './VerifiseringForm';

interface Props {
    kontakt: ApiKontakt;
}

export const OpenVerificationFormButon: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ kontakt, ...props }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button
                leftIcon={<Icon as={NyttVindu} />}
                borderRadius="6"
                aria-label={`Verifiser kontaktinformasjon for ${kontakt.navn}`}
                {...props}
                onClick={onOpen}
            >
                Verifiser
            </Button>
            <Modal title={`Verifiser kontaktinformasjon for ${kontakt.navn}`} isOpen={isOpen} onClose={onClose}>
                <VerifiseringForm kontakt={kontakt} onSuccess={onClose} />
            </Modal>
        </>
    );
};
