import * as React from 'react';
import { Heading, List, ListItem } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { AddStasjonButton } from '../forms/AddStasjonButton';
import { StasjonNavItem } from './StasjonNavItem';

export const StasjonNavigation: React.FC = () => {
    // TODO: handle error/loading
    const { data: stasjoner } = useStasjoner();

    const sortedStasjoner = (stasjoner ?? []).sort((stasjonA, stasjonB) =>
        stasjonA.navn.localeCompare(stasjonB.navn, 'nb'),
    );

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
                Stasjoner
            </Heading>
            <List spacing="3">
                {sortedStasjoner.map((stasjon) => (
                    <ListItem key={stasjon.id}>
                        <StasjonNavItem stasjon={stasjon} />
                    </ListItem>
                ))}
            </List>
            <AddStasjonButton marginTop="10" width="full" variant="outlineOnSurface" />
        </Flex>
    );
};
