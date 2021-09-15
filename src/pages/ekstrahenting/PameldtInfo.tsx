import { Box, Text, Flex, Icon, useDisclosure, UnorderedList, ListItem } from '@chakra-ui/react';
import * as React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { usePartnere } from '../../services/partner/usePartnere';
import { UtlysFlerePartnereButton } from './forms/UtlysFlerePartnereButton';
import { IconButton } from '../../components/buttons/IconButton';
import Info from '../../assets/Info.svg';
import { AarsakForm } from '../avlysningsaarsaker/AarsakForm';
import { Modal } from '../../components/Modal';

interface Props {
    ekstraHenting: ApiEkstraHenting;
    isPast: boolean;
}

export const PameldtInfo: React.FC<Props> = ({ ekstraHenting, isPast }) => {
    const { data: allPartnere, isLoading, isLoadingError } = usePartnere();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {ekstraHenting.godkjentUtlysning ? (
                <Text>{ekstraHenting.godkjentUtlysning.partnerNavn}</Text>
            ) : (
                <Flex justifyContent="space-between" direction={{ base: 'column', xl: 'row' }}>
                    <Box marginRight="1">
                        <Flex direction="row">
                            <IconButton
                                colorScheme="transparent"
                                icon={<Icon as={Info} boxSize={6} />}
                                aria-label="Se utlyste partnere"
                                onClick={onOpen}
                            />
                            <Modal title="Utsendt til" isOpen={isOpen} onClose={onClose}>
                                <UnorderedList marginBottom="4" padding="2">
                                    {ekstraHenting &&
                                        ekstraHenting.utlysninger.map((partner) => (
                                            <ListItem margin="2" key={partner.partnerId}>
                                                {partner.partnerNavn}
                                            </ListItem>
                                        ))}
                                </UnorderedList>
                            </Modal>
                            <Flex direction="column">
                                <Text fontSize="sm" fontWeight="bold">
                                    {isLoading ||
                                    isLoadingError ||
                                    ekstraHenting.utlysninger.length < allPartnere!.length
                                        ? `Utsendt til ${ekstraHenting.utlysninger.length} ${
                                              ekstraHenting.utlysninger.length === 1 ? 'partner' : 'partnere'
                                          }`
                                        : `Utsendt til alle partnere`}
                                </Text>
                                <Text fontSize="sm" fontStyle="italic">
                                    Ingen påmeldt
                                </Text>
                            </Flex>
                        </Flex>
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
