import * as React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { ButtonGroup, Heading } from '@chakra-ui/react';
import { useAuth } from '../../../auth/useAuth';
import { ApiStasjon, StasjonType } from '../../../services/stasjon/StasjonService';
import { EditStasjonButton } from '../forms/EditStasjonButton';
import { DeleteStasjonButton } from '../forms/DeleteStasjonButton';

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
                <ButtonGroup spacing="3" size="sm">
                    <EditStasjonButton stasjon={stasjon} />
                    {process.env.NODE_ENV === 'development' ? (
                        // TODO: hacky solution to only show station deletion button
                        //  when project is built for development (and not in production)
                        <DeleteStasjonButton stasjon={stasjon} />
                    ) : null}
                </ButtonGroup>
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
