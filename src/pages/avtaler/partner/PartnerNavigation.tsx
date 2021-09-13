import * as React from 'react';
import { Heading, HStack, List, ListItem, useDisclosure, VStack } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './AddPartnerButton';
import { PartnerNavItem } from './PartnerNavItem';
import { usePartnere } from '../../../services/partner/usePartnere';
import { useAuth } from '../../../auth/useAuth';
import { ListSkeleton } from '../../../components/forms/checkbox/ListSkeleton';
import { PartnerFilterSelect } from './PartnerFilterSelect';
import { useEffect, useState } from 'react';
import { getAvtaleTitle } from '../avtale/AvtaleInfoItem';
import { ApiPartner } from '../../../services/partner/PartnerService';

export const PartnerNavigation: React.FC = () => {
    const { user } = useAuth();
    const { data: partnere, isError, isLoading } = usePartnere({ params: { includeAvtaler: true } });
    const [selectedAvtaler, setSelectedAvtaler] = useState<string[]>([]);
    const [filteredList, setFilteredList] = useState<ApiPartner[]>([]);

    useEffect(() => {
        if (isLoading) {
            return;
        }
        if (partnere) {
            const aktiveAvtaler = partnere.filter((partner) =>
                partner.avtaler.some((avtale) => getAvtaleTitle(avtale) === 'Aktiv avtale'),
            );

            const kommendeAvtaler = partnere.filter((partner) =>
                partner.avtaler.some((avtale) => getAvtaleTitle(avtale) === 'Kommende avtale'),
            );

            const ingenAvtaler = partnere.filter((partner) => partner.avtaler.length === 0);

            let temp: ApiPartner[] = [];

            /*
             *  Fikse problem med at ledeteksten i noen av partnere endrer seg - Eirik nevnte at dette var pga av noe forskjellig på sortering inne i partnere og da
             * vil metoden som henter nyeste avtale displaye feil på et eller annet tidspunkt
             *  Legge til søkefunksjon
             *  Viser feil antall henteplaner
             */

            if (selectedAvtaler.includes('aktiv')) {
                temp = temp.concat(aktiveAvtaler);
            }
            if (partnere && selectedAvtaler.includes('kommende')) {
                temp = temp.concat(kommendeAvtaler);
            }
            if (partnere && selectedAvtaler.includes('ingen')) {
                temp = temp.concat(ingenAvtaler);
            }
            if (selectedAvtaler.length === 0) {
                setFilteredList(partnere);
            }
            if (temp.length > 0) {
                setFilteredList(Array.from(new Set(temp)));
            }
        }
    }, [selectedAvtaler, isLoading]);

    useEffect(() => {
        return;
    }, [filteredList]);

    const getPartnerList = () => {
        if (isLoading) {
            return <ListSkeleton loadingText="Laster inn partnere..." startColor="gray.500" endColor="gray.300" />;
        }
        if (isError) {
            return 'Beklager, klarte ikke laste inn partnere.';
        }
        if (filteredList) {
            return (
                <Flex width="full" direction={{ desktop: 'row', base: 'column' }} marginY="6">
                    <PartnerFilterSelect selectedAvtaler={selectedAvtaler} setSelectedAvtaler={setSelectedAvtaler} />
                    <Flex
                        direction="column"
                        width={{ base: 'auto', desktop: '70%' }}
                        marginLeft={{ desktop: '8', base: '0' }}
                    >
                        <Flex
                            justifyContent="space-between"
                            marginBottom="3"
                            width="full"
                            flexDir={{ base: 'column', tablet: 'row' }}
                        >
                            <Heading as="h2" fontSize="xl" marginBottom={{ base: '4', tablet: '0' }}>
                                Samarbeidspartnere
                            </Heading>
                            {user.isAdmin ? <AddPartnerButton fontSize="14" /> : null}
                        </Flex>
                        <List width="full" spacing="10">
                            {filteredList.map((partner) => (
                                <ListItem key={partner.id}>
                                    <PartnerNavItem partner={partner} />
                                </ListItem>
                            ))}
                        </List>
                    </Flex>
                </Flex>
            );
        }
    };

    return (
        <Flex
            direction="column"
            as="nav"
            alignItems="flex-start"
            height="full"
            padding="5"
            width={{ base: 'full', desktop: '80%', '2xl': '50%' }}
            margin="auto"
            marginTop="10"
        >
            {getPartnerList()}
        </Flex>
    );
};
