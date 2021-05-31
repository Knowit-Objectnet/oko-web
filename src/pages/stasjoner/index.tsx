import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Heading, List, ListItem } from '@chakra-ui/react';
import { AddStasjonButton } from './forms/AddStasjonButton';
import { Flex } from '@chakra-ui/layout';
import { mockStasjoner } from '../../../__mocks__/mocks-new/mockAktor';

const Stasjoner: React.FC = () => {
    // TODO: fetch from new API and handle error/loading
    const stasjoner = mockStasjoner;

    return (
        <>
            <Helmet>
                <title>Stasjoner</title>
            </Helmet>
            <Flex as="main" direction="column" alignItems="flex-start" height="full" padding="5" marginX="auto">
                <Flex justifyContent="space-between" width="full" marginY="4" alignItems="center">
                    <Heading as="h1" fontWeight="medium" fontSize="4xl">
                        Stasjoner
                    </Heading>
                    <AddStasjonButton size="sm" />
                </Flex>
                <List spacing="2">
                    {(stasjoner ?? []).map((stasjon) => (
                        <ListItem key={stasjon.id}>
                            {/*<PartnerNavItem partner={partner} />*/}
                            {stasjon.navn}
                        </ListItem>
                    ))}
                </List>
                <AddStasjonButton marginTop="10" width="full" variant="outline" />
            </Flex>
        </>
    );
};

export default Stasjoner;
