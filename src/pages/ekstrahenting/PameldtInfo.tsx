import { Box, Text, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { usePartnere } from '../../services/partner/usePartnere';
import { UtlysFlerePartnereButton } from './forms/UtlysFlerePartnereButton';

interface Props {
    henting: ApiEkstraHenting;
}

export const PameldtInfo: React.FC<Props> = ({ henting }) => {
    const { data: allPartnere, isLoading, isLoadingError } = usePartnere({ queryOptions: { keepPreviousData: true } });

    return (
        <>
            {henting.godkjentUtlysning ? (
                <Text>{henting.godkjentUtlysning.partnerNavn}</Text>
            ) : (
                <Flex justifyContent="space-between">
                    <Box marginRight="1">
                        <Text fontSize="sm" fontWeight="bold">
                            {isLoading || isLoadingError || henting.utlysninger.length < allPartnere!.length
                                ? `Utsendt til ${henting.utlysninger.length} ${
                                      henting.utlysninger.length === 1 ? 'partner' : 'partnere'
                                  }`
                                : `Utsendt til alle partnere`}
                        </Text>
                        <Text fontSize="sm" fontStyle="italic">
                            Ingen påmeldt
                        </Text>
                    </Box>
                    {!isLoading && !isLoadingError && henting.utlysninger.length < allPartnere!.length ? (
                        <UtlysFlerePartnereButton henting={henting} backgroundColor="White" borderRadius="6" />
                    ) : null}
                </Flex>
            )}
        </>
    );
};
