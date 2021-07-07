import * as React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { EditPartnerButton } from './EditPartnerButton';
import { useAuth } from '../../../auth/useAuth';

interface Props {
    partner: ApiPartner;
}

export const PartnerInfoHeader: React.FC<Props> = ({ partner }) => {
    const { user } = useAuth();
    return (
        <>
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="bold" fontSize="4xl">
                    {partner.navn}
                </Heading>
                {user.isAdmin ? <EditPartnerButton partner={partner} size="sm" /> : null}
            </Flex>
            <Box
                as="section"
                aria-label={`Generell informasjon for ${partner.navn}`}
                backgroundColor="gray.100"
                width="full"
                padding="5"
                marginBottom="4"
                sx={{
                    'dt, dd': {
                        display: 'inline',
                        marginRight: '1',
                    },
                }}
            >
                <dl>
                    <Box>
                        <dd>{partner.ideell ? 'Ideell organisasjon' : 'Kommersiell organisasjon'}</dd>
                    </Box>
                </dl>
            </Box>
        </>
    );
};
