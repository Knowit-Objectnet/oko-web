import * as React from 'react';
import { Heading, List, ListItem } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './AddPartnerButton';
import { PartnerNavItem } from './PartnerNavItem';
import { usePartnere } from '../../../services/partner/usePartnere';
import { useAuth } from '../../../auth/useAuth';

export const PartnerNavigation: React.FC = () => {
    // TODO: handle error/loading
    const { user } = useAuth();
    const { data: partnere } = usePartnere();

    const sortedPartnere = (partnere ?? []).sort((partnerA, partnerB) =>
        partnerA.navn.localeCompare(partnerB.navn, 'nb'),
    );

    /* const filterPartnere = partnere?.filter((partner)=>{
        if(partner.)
    })*/

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
            <List spacing="3">
                {sortedPartnere.map((partner) => (
                    <ListItem key={partner.id}>
                        <PartnerNavItem partner={partner} />
                    </ListItem>
                ))}
            </List>
            {user.isAdmin ? <AddPartnerButton marginTop="10" width="full" variant="outlineOnSurface" /> : null}
        </Flex>
    );
};
