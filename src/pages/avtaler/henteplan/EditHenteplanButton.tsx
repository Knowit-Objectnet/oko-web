import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { FormModal } from '../../../components/forms/FormModal';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiHenteplan } from '../../../services/henteplan/HenteplanService';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { EditHenteplanForm } from './EditHenteplanForm';

interface Props {
    avtale: ApiAvtale;
    henteplan: ApiHenteplan;
}

export const EditHenteplanButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({
    henteplan,
    avtale,
    ...props
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <EditButton label="Rediger" aria-label="Rediger henteplanen" {...props} onClick={onOpen} />
            <FormModal title="Rediger henteplan" isOpen={isOpen} onClose={onClose}>
                <EditHenteplanForm onSuccess={onClose} henteplan={henteplan} avtale={avtale} />
            </FormModal>
        </>
    );
};
