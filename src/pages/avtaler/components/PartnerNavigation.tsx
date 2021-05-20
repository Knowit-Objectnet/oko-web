import * as React from 'react';
import { Heading, List, ListItem } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './AddPartnerButton';
import { PartnerNavItem } from './PartnerNavItem';
import { mockPartnere } from '../../../../__mocks__/mocks-new/mockAktor';

export const PartnerNavigation: React.FC = () => {
    // TODO: fetch partners from API/cache, handle error/loading
    const partnere = mockPartnere;

    return (
        <Flex
            direction="column"
            as="nav"
            alignItems="flex-start"
            backgroundColor="surface"
            height="full"
            padding="5"
            minWidth="300px"
        >
            <Heading
                as="h2"
                width="full"
                fontSize="xl"
                paddingBottom="3"
                marginBottom="4"
                borderBottom="1px solid"
                borderBottomColor="DarkBeige"
            >
                Partnere
            </Heading>
            <List spacing="2">
                {(partnere ?? []).map((partner) => (
                    <ListItem key={partner.id}>
                        <PartnerNavItem partner={partner} />
                    </ListItem>
                ))}
            </List>
            <AddPartnerButton marginTop="10" />
        </Flex>
    );
};
