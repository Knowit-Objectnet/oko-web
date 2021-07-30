import { Button, ButtonProps } from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ApiHentingWrapper } from '../../services/henting/HentingService';

interface Props {
    henting: ApiHentingWrapper;
}

export const HentingDetailsLink: React.FC<Props & ButtonProps> = ({ henting, ...props }) => (
    <Button
        {...props}
        as={Link}
        to={{
            pathname: `/henting/${henting.id}`,
            state: { henting: henting },
        }}
    >
        Gå til henting
    </Button>
);
