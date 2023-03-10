import { Button, ButtonProps } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { HentingDetailsRoutingProps } from '../../henting/HentingDetails';

interface Props {
    henting: ApiHentingWrapper;
}

export const EditVektButton: React.FC<Props & ButtonProps> = ({ henting, ...props }) => {
    const linkState: HentingDetailsRoutingProps = { henting: henting, showBackButton: true };

    return (
        <Button
            {...props}
            as={Link}
            to={{
                pathname: `/vekt/rediger/${henting.id}`,
                state: linkState,
            }}
        >
            Rediger vekt
        </Button>
    );
};
