import * as React from 'react';
import { Heading, HStack, List, ListItem, useDisclosure } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './AddPartnerButton';
import { PartnerNavItem } from './PartnerNavItem';
import { usePartnere } from '../../../services/partner/usePartnere';
import { useAuth } from '../../../auth/useAuth';
import { ListSkeleton } from '../../../components/forms/checkbox/ListSkeleton';
import { PartnerFilterSelect } from './PartnerFilterSelect';
import { useEffect, useState } from 'react';

export const PartnerNavigation: React.FC = () => {
    const { user } = useAuth();
    const { data: partnere, isError, isLoading } = usePartnere({ params: { includeAvtaler: true } });
    const [selectedAvtaler, setSelectedAvtaler] = useState<string[]>([]);

    useEffect(() => {
        //Basert på filter, mappe riktig avtaler
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
                <Flex direction="row">
                    <PartnerFilterSelect selectedAvtaler={selectedAvtaler} setSelectedAvtaler={setSelectedAvtaler} />

                    <List spacing="10" width="full">
                        {partnere.map((partner) => (
                            <ListItem key={partner.id}>
                                <PartnerNavItem partner={partner} />
                            </ListItem>
                        ))}
                    </List>
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
            width={{ base: 'full', desktop: '70%', '2xl': '50%' }}
            margin="auto"
        >
            <Flex
                justifyContent="space-between"
                width="full"
                marginY="6"
                alignItems="center"
                flexDir={{ base: 'column', tablet: 'row' }}
            >
                <Heading as="h2" fontSize="xl" marginBottom={{ base: '4', tablet: '0' }}>
                    Samarbeidspartnere
                </Heading>
                {user.isAdmin ? <AddPartnerButton fontSize="14" /> : null}
            </Flex>
            {getPartnerList()}
        </Flex>
    );
};
