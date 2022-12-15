import * as React from 'react';
import { Heading, List, ListItem, Text } from '@chakra-ui/react';
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
    const [selectedAvtaler, setSelectedAvtaler] = useState<string[]>(['aktiv']);
    const [filteredList, setFilteredList] = useState<ApiPartner[]>([]);
    const [inputFieldValue, setInputFieldValue] = useState<string>('');

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
            const today = new Date();
            const ingenAvtaler = partnere.filter(
                (partner) =>
                    partner.avtaler.length === 0 ||
                    partner.avtaler.every((avtale) => new Date(avtale.sluttDato) < today),
            );

            let tempFilteredList: ApiPartner[] = [];
            if (selectedAvtaler.includes('aktiv')) {
                if (inputFieldValue.trim() !== '') {
                    const searchedItems = partnere.filter((partner) =>
                        partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                    );
                    tempFilteredList = tempFilteredList.concat(
                        searchedItems.filter((value) => aktiveAvtaler.includes(value)),
                    );
                } else if (aktiveAvtaler.length === 0) {
                    setFilteredList([]);
                } else {
                    tempFilteredList = tempFilteredList.concat(aktiveAvtaler);
                }
            }
            if (selectedAvtaler.includes('kommende')) {
                if (inputFieldValue.trim() !== '') {
                    const searchedItems = partnere.filter((partner) =>
                        partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                    );
                    tempFilteredList = tempFilteredList.concat(
                        searchedItems.filter((value) => kommendeAvtaler.includes(value)),
                    );
                } else if (kommendeAvtaler.length === 0) {
                    setFilteredList([]);
                } else {
                    tempFilteredList = tempFilteredList.concat(kommendeAvtaler);
                }
            }
            if (selectedAvtaler.includes('ingen')) {
                if (inputFieldValue.trim() !== '') {
                    const searchedItems = partnere.filter((partner) =>
                        partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                    );
                    tempFilteredList = tempFilteredList.concat(
                        searchedItems.filter((value) => ingenAvtaler.includes(value)),
                    );
                } else if (ingenAvtaler.length === 0) {
                    setFilteredList([]);
                } else {
                    tempFilteredList = tempFilteredList.concat(ingenAvtaler);
                }
            }
            if (selectedAvtaler.length === 0 && inputFieldValue.trim() !== '') {
                const searchedItems = partnere.filter((partner) =>
                    partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                );
                tempFilteredList = tempFilteredList.concat(searchedItems);
            }
            if (selectedAvtaler.length === 0) {
                setFilteredList(partnere);
            }
            if (tempFilteredList.length > 0) {
                setFilteredList(Array.from(new Set(tempFilteredList)));
            }
        }
    }, [selectedAvtaler, isLoading, inputFieldValue]);

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
                    <PartnerFilterSelect
                        setInputFieldValue={setInputFieldValue}
                        selectedAvtaler={selectedAvtaler}
                        setSelectedAvtaler={setSelectedAvtaler}
                    />
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
                        {filteredList.length !== 0 ? (
                            <List width="full" spacing="10">
                                {filteredList.map((partner) => (
                                    <ListItem key={partner.id}>
                                        <PartnerNavItem partner={partner} />
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Text fontStyle="italic">Ingen partnere funnet</Text>
                        )}
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
        >
            {getPartnerList()}
        </Flex>
    );
};
