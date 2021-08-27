import * as React from 'react';
import { Button, ButtonProps, Icon } from '@chakra-ui/react';
import Plus from '../../../assets/Plus.svg';
import { Link } from 'react-router-dom';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { HentingDetailsRoutingProps } from '../HentingDetails';

interface Props {
    henting: ApiHentingWrapper;
}

export const RegisterVektButton: React.FC<Props & ButtonProps> = ({ henting, ...props }) => {
    const linkState: HentingDetailsRoutingProps = { henting: henting, showBackButton: true };

    return (
        <Button
            as={Link}
            variant="primary"
            marginLeft="2"
            rightIcon={<Icon as={Plus} />}
            to={{
                pathname: `/vekt/registrer/${henting.id}`,
                state: linkState,
            }}
            {...props}
        >
            Registrer vekt
        </Button>
    );
};
