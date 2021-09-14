import * as React from 'react';
import { Heading, List, ListItem } from '@chakra-ui/react';
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

            const ingenAvtaler = partnere.filter((partner) => partner.avtaler.length === 0);
            let temp: ApiPartner[] = [];
            //Per nå kan man ikke backspace etter et søk og få tilbake flere treff. Det funker uten filter, men ikke med.
            if (selectedAvtaler.includes('aktiv')) {
                if (inputFieldValue.trim() !== '') {
                    const searchedItems = filteredList.filter((partner) =>
                        partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                    );
                    temp = temp.concat(searchedItems);
                } else {
                    temp = temp.concat(aktiveAvtaler);
                }
            }
            if (partnere && selectedAvtaler.includes('kommende')) {
                if (inputFieldValue.trim() !== '') {
                    const searchedItems = filteredList.filter((partner) =>
                        partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                    );
                    temp = temp.concat(searchedItems);
                } else {
                    temp = temp.concat(kommendeAvtaler);
                }
            }
            if (partnere && selectedAvtaler.includes('ingen')) {
                if (inputFieldValue.trim() !== '') {
                    const searchedItems = filteredList.filter((partner) =>
                        partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                    );
                    temp = temp.concat(searchedItems);
                } else {
                    temp = temp.concat(ingenAvtaler);
                }
            }
            if (selectedAvtaler.length === 0 && inputFieldValue.trim() !== '') {
                const searchedItems = partnere.filter((partner) =>
                    partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()),
                );
                temp = temp.concat(searchedItems);
            }
            if (selectedAvtaler.length === 0) {
                setFilteredList(partnere);
            }

            if (temp.length > 0) {
                setFilteredList(Array.from(new Set(temp)));
            }
        }
    }, [selectedAvtaler, isLoading, inputFieldValue]);

    /*useEffect(() => {
        if (partnere && inputFieldValue.trim() !== '') {
            const searchedItems = filteredList.filter((partner) =>
                partner.navn.toLowerCase().startsWith(inputFieldValue.toLowerCase()));

            setFilteredList(searchedItems);
        }
        if (partnere && inputFieldValue.trim() === '') {
            setFilteredList(partnere);
        }
    }, []);*/

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
