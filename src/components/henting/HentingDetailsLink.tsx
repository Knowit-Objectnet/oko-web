import { Button, ButtonProps } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ApiHentingWrapper } from '../../services/henting/HentingService';
import { HentingDetailsRoutingProps } from '../../pages/henting/HentingDetails';

interface Props {
    henting: ApiHentingWrapper;
}

export const HentingDetailsLink: React.FC<Props & ButtonProps> = ({ henting, ...props }) => {
    const linkState: HentingDetailsRoutingProps = { henting: henting, showBackButton: true };

    return (
        <Button
            {...props}
            as={Link}
            to={{
                pathname: `/henting/${henting.id}`,
                state: linkState,
            }}
        >
            Gå til henting
        </Button>
    );
};
