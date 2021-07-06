import { Box, Text, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { UtlysFlerPartnereButton } from './forms/UtlysFlerPartnereButton';

interface Props {
    henting: ApiEkstraHenting;
}

export const PameldtInfo: React.FC<Props> = ({ henting }) => {
    return (
        <>
            {henting.godkjentUtlysning ? (
                <Text>{henting.godkjentUtlysning.partnerNavn}</Text>
            ) : (
                <Flex justifyContent="space-between">
                    <Box marginRight="1">
                        <Text
                            fontSize="sm"
                            fontWeight="bold"
                        >{`Åpent for ${henting.utlysninger.length} partnere`}</Text>
                        <Text fontSize="sm" fontStyle="italic">
                            Ingen påmeldt
                        </Text>
                    </Box>
                    <UtlysFlerPartnereButton henting={henting} />
                </Flex>
            )}
        </>
    );
};
