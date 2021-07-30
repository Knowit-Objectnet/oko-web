import { AccordionButton, AccordionItem, AccordionPanel, Box, Flex, Heading, Icon } from '@chakra-ui/react';
import React from 'react';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { EkstraHentingTable } from './EkstraHentingTable';
import ArrowRight from '../../assets/ArrowRight.svg';
import { useAuth } from '../../auth/useAuth';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { partition } from 'lodash';
import { isFuture, startOfDay } from 'date-fns';
import { parseISOIgnoreTimezone } from '../../utils/hentingDateTimeHelpers';
import { sortedEkstraHentingerByDatoAsc, sortedEkstraHentingerByDatoDesc } from './EkstraHentingSortedInfo';

export const EkstraHentingInfoListAdmin: React.FC = () => {
    const { user } = useAuth();
    const { data: ekstraHentinger } = useEkstraHentingerWithUtlysning();

    //const sortedEkstraHentinger = sortedEkstraHentingerByDato(ekstraHentinger ?? []);

    const [aktiveEkstraHentinger, tidligereEkstraHentinger] = partition<ApiEkstraHenting>(
        ekstraHentinger,
        (ekstraHenting) => isFuture(parseISOIgnoreTimezone(ekstraHenting.sluttTidspunkt)),
    );
    const sortedTidligereEkstraHentinger = sortedEkstraHentingerByDatoAsc(tidligereEkstraHentinger);
    const sortedAktiveEkstraHentinger = sortedEkstraHentingerByDatoDesc(aktiveEkstraHentinger);

    return (
        <>
            <Flex justifyContent="space-between" width="full" marginY="12" alignItems="center">
                <Heading as="h1" fontWeight="normal" fontSize="2xl">
                    Aktive ekstrahentinger
                </Heading>
            </Flex>
            <Box width="full" overflowX="auto">
                <EkstraHentingTable ekstraHentinger={sortedAktiveEkstraHentinger} />
            </Box>
            {user.isAdmin ? (
                <AccordionItem>
                    {({ isExpanded }) => (
                        <Flex direction="column" width="full" marginY="12">
                            <Heading as="h3" flex="1" marginBottom="4">
                                <AccordionButton
                                    width="fit-content"
                                    fontSize="2xl"
                                    fontWeight="normal"
                                    padding="0"
                                    _hover={{ background: 'none', textDecoration: 'underline' }}
                                >
                                    <Icon
                                        as={ArrowRight}
                                        transform={`translate(-2px, -2px) rotate(${isExpanded ? '90deg' : '0deg'})`}
                                        transformOrigin="center"
                                        transition="transform 200ms ease-in-out"
                                        marginRight="1"
                                    />
                                    Tidligere ekstrahentinger
                                </AccordionButton>
                            </Heading>

                            <AccordionPanel padding="0">
                                <EkstraHentingTable ekstraHentinger={sortedTidligereEkstraHentinger} />
                            </AccordionPanel>
                        </Flex>
                    )}
                </AccordionItem>
            ) : null}
        </>
    );
};
