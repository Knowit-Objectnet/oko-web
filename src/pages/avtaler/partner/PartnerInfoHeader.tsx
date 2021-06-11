import * as React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { ApiPartner } from '../../../services/partner/PartnerService';
import { EditPartnerButton } from './EditPartnerButton';

interface Props {
    partner: ApiPartner;
}

export const PartnerInfoHeader: React.FC<Props> = ({ partner }) => (
    <>
        <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
            <Heading as="h1" fontWeight="medium" fontSize="4xl">
                {partner.navn}
            </Heading>
            <EditPartnerButton partner={partner} size="sm" />
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
                    <dt>Ideell organisasjon:</dt>
                    <dd>{partner.ideell ? 'ja' : 'nei'}</dd>
                </Box>
            </dl>
        </Box>
    </>
);
