import { NavLink, useRouteMatch } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import React from 'react';
import { ApiPartner } from '../../../services-new/AktorService';

interface Props {
    partner: ApiPartner;
}

export const PartnerNavItem: React.FC<Props> = ({ partner }) => {
    const { url } = useRouteMatch();
    return (
        <Link
            as={NavLink}
            to={`${url}/${partner.id}`}
            _activeLink={{
                fontWeight: 'bold',
                '&:before': {
                    content: `""`,
                    display: 'block',
                    width: '2',
                    height: '2',
                    backgroundColor: 'onSurface',
                    borderRadius: '50%',
                    position: 'absolute',
                    transform: 'translate(-20px, 80%)',
                },
            }}
            display="block"
            paddingLeft={5}
            position="relative"
        >
            {partner.navn}
        </Link>
    );
};
