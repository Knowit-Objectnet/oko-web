import * as React from 'react';
import { ApiPartner } from '../../../services-new/AktorService';
import { Box, Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { PartnerStorrelse } from '../../../types';

const PARTNER_STORRELSE: Record<PartnerStorrelse, string> = {
    LITEN: 'liten',
    MIDDELS: 'middels',
    STOR: 'stor',
};

interface Props {
    partner: ApiPartner;
}

export const PartnerInfoHeader: React.FC<Props> = ({ partner }) => (
    <>
        <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
            <Heading as="h1" fontWeight="medium" fontSize="4xl">
                {partner.navn}
            </Heading>
            <EditButton
                size="sm"
                label="Rediger partner"
                onClick={() => {
                    console.log('Rediger partner');
                }}
            />
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
                    <dt>Størrelse:</dt>
                    <dd>{PARTNER_STORRELSE[partner.storrelse]}</dd>
                </Box>
                <Box>
                    <dt>Ideell organisasjon:</dt>
                    <dd>{partner.ideell ? 'ja' : 'nei'}</dd>
                </Box>
            </dl>
        </Box>
    </>
);
