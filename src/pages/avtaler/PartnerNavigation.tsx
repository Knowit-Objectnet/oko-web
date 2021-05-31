import * as React from 'react';
import { Heading, List, ListItem } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './forms/AddPartnerButton';
import { PartnerNavItem } from './PartnerNavItem';
import { mockPartnere } from '../../../__mocks__/mocks-new/mockAktor';
import { usePartnere } from '../../services-currentapi/hooks/usePartnere';

export const PartnerNavigation: React.FC = () => {
    // TODO: handle error/loading
    const { data: partnere } = usePartnere();

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
                Samarbeidspartnere
            </Heading>
            <List spacing="2">
                {(partnere ?? []).map((partner) => (
                    <ListItem key={partner.id}>
                        <PartnerNavItem partner={partner} />
                    </ListItem>
                ))}
            </List>
            <AddPartnerButton marginTop="10" width="full" variant="outline" />
        </Flex>
    );
};
