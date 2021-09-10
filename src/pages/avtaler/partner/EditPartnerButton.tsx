import * as React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { useHistory } from 'react-router-dom';

interface Props {
    partner: ApiPartner;
}

export const EditPartnerButton: React.FC<Props & Omit<ButtonProps, 'onClick'>> = ({ partner, ...props }) => {
    const history = useHistory();

    const onClick = () => history.push(`/partnere/rediger?partnerId=${partner.id}`, { partner: partner });

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
