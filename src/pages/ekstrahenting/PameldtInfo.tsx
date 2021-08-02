import { Box, Text, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { usePartnere } from '../../services/partner/usePartnere';
import { UtlysFlerePartnereButton } from './forms/UtlysFlerePartnereButton';

interface Props {
    ekstraHenting: ApiEkstraHenting;
}

export const PameldtInfo: React.FC<Props> = ({ ekstraHenting }) => {
    const { data: allPartnere, isLoading, isLoadingError } = usePartnere({ queryOptions: { keepPreviousData: true } });

    return (
        <>
            {ekstraHenting.godkjentUtlysning ? (
                <Text>{ekstraHenting.godkjentUtlysning.partnerNavn}</Text>
            ) : (
                <Flex justifyContent="space-between">
                    <Box marginRight="1">
                        <Text fontSize="sm" fontWeight="bold">
                            {isLoading || isLoadingError || ekstraHenting.utlysninger.length < allPartnere!.length
                                ? `Utsendt til ${ekstraHenting.utlysninger.length} ${
                                      ekstraHenting.utlysninger.length === 1 ? 'partner' : 'partnere'
                                  }`
                                : `Utsendt til alle partnere`}
                        </Text>
                        <Text fontSize="sm" fontStyle="italic">
                            Ingen påmeldt
                        </Text>
                    </Box>
                    {!isLoading && !isLoadingError && ekstraHenting.utlysninger.length < allPartnere!.length ? (
                        <UtlysFlerePartnereButton henting={ekstraHenting} backgroundColor="White" borderRadius="6" />
                    ) : null}
                </Flex>
            )}
        </>
    );
};
