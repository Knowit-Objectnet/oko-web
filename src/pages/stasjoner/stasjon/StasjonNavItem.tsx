import { NavLink, useRouteMatch } from 'react-router-dom';
import { Link } from '@chakra-ui/react';
import * as React from 'react';
import { ApiStasjon } from '../../../services/stasjon/StasjonService';

interface Props {
    stasjon: ApiStasjon;
}

export const StasjonNavItem: React.FC<Props> = ({ stasjon }) => {
    const { url } = useRouteMatch();
    return (
        <Link
            as={NavLink}
            to={`/stasjoner/${stasjon.id}`}
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
            paddingLeft="5"
            position="relative"
            lineHeight="1.2"
        >
            {stasjon.navn}
        </Link>
    );
};
