import * as React from 'react';
import { ButtonProps, useDisclosure } from '@chakra-ui/react';
import { Modal } from '../../../components/Modal';
import { PartnerForm } from './PartnerForm';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface Props {
    partner: ApiPartner;
}

export const EditPartnerButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const onClick = () =>
        history.push(`/partnere/rediger?partnerId=${partner.id}`, { partnerToEdit: partner, callback: url });

    return (
        <>
            <EditButton
                label="Rediger partner"
                borderRadius="6"
                aria-label={`Rediger informasjon for ${partner.navn}`}
                {...props}
                onClick={onClick}
            />
        </>
    );
};
