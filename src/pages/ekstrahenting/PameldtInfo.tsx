import { Box, Text, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { usePartnere } from '../../services/partner/usePartnere';
import { UtlysFlerePartnereButton } from './forms/UtlysFlerePartnereButton';

interface Props {
    ekstraHenting: ApiEkstraHenting;
    isPast: boolean;
}

export const PameldtInfo: React.FC<Props> = ({ ekstraHenting, isPast }) => {
    const { data: allPartnere, isLoading, isLoadingError } = usePartnere();

    return (
        <>
            {ekstraHenting.godkjentUtlysning ? (
                <Text>{ekstraHenting.godkjentUtlysning.partnerNavn}</Text>
            ) : (
                <Flex justifyContent="space-between" direction={{ base: 'column', xl: 'row' }}>
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
                    {!isLoading &&
                    !isLoadingError &&
                    ekstraHenting.utlysninger.length < allPartnere!.length &&
                    !isPast ? (
                        <UtlysFlerePartnereButton
                            henting={ekstraHenting}
                            backgroundColor="White"
                            borderRadius="6"
                            marginTop={{ base: '10px', xl: '0' }}
                        />
                    ) : null}
                </Flex>
            )}
        </>
    );
};
