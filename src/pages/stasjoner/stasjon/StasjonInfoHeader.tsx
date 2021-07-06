import * as React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import { useAuth } from '../../../auth/useAuth';
import { ApiStasjon, StasjonType } from '../../../services/stasjon/StasjonService';
import { EditStasjonButton } from '../forms/EditStasjonButton';

const STASJONTYPE: Record<StasjonType, string> = {
    GJENBRUK: 'Gjenbruksstasjon',
    MINI: 'Minigjenbruksstasjon',
};

interface Props {
    stasjon: ApiStasjon;
}

export const StasjonInfoHeader: React.FC<Props> = ({ stasjon }) => {
    const { user } = useAuth();
    return (
        <>
            <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                <Heading as="h1" fontWeight="bold" fontSize="4xl">
                    {stasjon.navn}
                </Heading>
                {user.isAdmin ? <EditStasjonButton stasjon={stasjon} size="sm" /> : null}
            </Flex>
            <Box
                as="section"
                aria-label={`Generell informasjon for ${stasjon.navn}`}
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
                <Box>
                    <dt>Stasjonstype:</dt>
                    <dd>{STASJONTYPE[stasjon.type] ?? 'Ukjent type'}</dd>
                </Box>
            </Box>
        </>
    );
};
