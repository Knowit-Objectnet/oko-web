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
    let filteredList: ApiPartner[] | undefined = [];
    useEffect(() => {
        //Basert på filter, mappe riktig avtaler
        //Mulige verdier: aktiv, ingen, kommende
        //Hvis jeg bytter value fra checkboksene til å være det samme som getAvtaleTitle så kan jeg la en enkel sjekk for alle
        if (partnere && selectedAvtaler.includes('aktiv')) {
            filteredList = partnere.filter((partner) =>
                partner.avtaler.some((avtale) => getAvtaleTitle(avtale) === 'Aktiv avtale'),
            );
            console.log(filteredList);
        }
    }, [selectedAvtaler]);

    const getPartnerList = () => {
        if (isLoading) {
            return <ListSkeleton loadingText="Laster inn partnere..." startColor="gray.500" endColor="gray.300" />;
        }
        if (isError) {
            return 'Beklager, klarte ikke laste inn partnere.';
        }
        if (partnere) {
            return (
                <Flex direction={{ desktop: 'row', base: 'column' }} marginY="6">
                    <PartnerFilterSelect selectedAvtaler={selectedAvtaler} setSelectedAvtaler={setSelectedAvtaler} />
                    <VStack marginLeft={{ desktop: '8', base: '0' }}>
                        <Flex justifyContent="space-between" width="full" flexDir={{ base: 'column', tablet: 'row' }}>
                            <Heading as="h2" fontSize="xl" marginBottom={{ base: '4', tablet: '0' }}>
                                Samarbeidspartnere
                            </Heading>
                            {user.isAdmin ? <AddPartnerButton fontSize="14" /> : null}
                        </Flex>
                        <List spacing="10" width="full">
                            {partnere.map((partner) => (
                                <ListItem key={partner.id}>
                                    <PartnerNavItem partner={partner} />
                                </ListItem>
                            ))}
                        </List>
                    </VStack>
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
        >
            {getPartnerList()}
        </Flex>
    );
};
