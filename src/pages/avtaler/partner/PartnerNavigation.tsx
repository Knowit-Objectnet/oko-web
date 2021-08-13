import * as React from 'react';
import { Heading, List, ListItem } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './AddPartnerButton';
import { PartnerNavItem } from './PartnerNavItem';
import { usePartnere } from '../../../services/partner/usePartnere';
import { useAuth } from '../../../auth/useAuth';
import { ListSkeleton } from '../../../components/forms/checkbox/ListSkeleton';

export const PartnerNavigation: React.FC = () => {
    const { user } = useAuth();
    const { data: partnere, isError, isLoading } = usePartnere();

    const getPartnerList = () => {
        if (isLoading) {
            return <ListSkeleton loadingText="Laster inn partnere..." startColor="gray.500" endColor="gray.300" />;
        }
        if (isError) {
            return 'Beklager, klarte ikke laste inn partnere.';
        }
        if (partnere) {
            return (
                <List spacing="3">
                    {partnere.map((partner) => (
                        <ListItem key={partner.id}>
                            <PartnerNavItem partner={partner} />
                        </ListItem>
                    ))}
                </List>
            );
        }
    };

    return (
        <Flex
            direction="column"
            as="nav"
            alignItems="flex-start"
            backgroundColor="surface"
            height="full"
            padding="5"
            width="300px"
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
            {getPartnerList()}
            {user.isAdmin ? <AddPartnerButton marginTop="10" width="full" variant="outlineOnSurface" /> : null}
        </Flex>
    );
};
