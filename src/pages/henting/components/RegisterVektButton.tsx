import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { Link, useLocation } from 'react-router-dom';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

interface Props {
    henting: ApiHentingWrapper;
}

export const RegisterVektButton: React.FC<Props & ButtonProps> = ({ henting, ...props }) => {
    const location = useLocation();
    return (
        <Button
            as={Link}
            variant="primary"
            rightIcon={<Icon as={Plus} />}
            to={{
                pathname: `/vekt/${henting.id}`,
                state: { henting: henting, prevPath: location.pathname + location.search },
            }}
            {...props}
        >
            Registrer vekt
        </Button>
    );
};
