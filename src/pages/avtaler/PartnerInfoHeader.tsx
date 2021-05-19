import React from 'react';
import { ApiPartner } from '../../services-new/AktorService';
import { Box, Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { EditButton } from '../../components/buttons/EditButton';

interface Props {
    partner: ApiPartner;
}

export const PartnerInfoHeader: React.FC<Props> = ({ partner }) => (
    <>
        <Flex justifyContent="space-between" width="100%" marginY={4} alignItems="center">
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
        <GeneralPartnerInfo partner={partner} />
    </>
);

const GeneralPartnerInfo: React.FC<Props> = ({ partner }) => (
    <Box
        as="section"
        backgroundColor="gray.100"
        width="100%"
        padding={5}
        marginBottom={4}
        sx={{
            'dt, dd': {
                display: 'inline',
                marginRight: '1',
            },
        }}
    >
        {/*TODO: mangler tittel i denne seksjonen */}
        <dl>
            <Box>
                <dt>Størrelse:</dt>
                <dd>{partner.storrelse}</dd>
            </Box>
            <Box>
                <dt>Ideell organisasjon:</dt>
                <dd>{partner.ideell ? 'Ja' : 'Nei'}</dd>
            </Box>
        </dl>
    </Box>
);
