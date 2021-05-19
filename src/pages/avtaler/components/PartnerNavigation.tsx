import React from 'react';
import { Heading } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/layout';
import { AddPartnerButton } from './AddPartnerButton';
import { PartnerNavList } from './PartnerNavList';

export const PartnerNavigation: React.FC = () => (
    <Flex
        direction="column"
        as="nav"
        alignItems="flex-start"
        backgroundColor="surface"
        height="100%"
        padding={5}
        minWidth="300px"
    >
        <Heading
            as="h2"
            width="100%"
            fontSize="xl"
            paddingBottom={3}
            marginBottom={4}
            borderBottom="1px solid"
            borderBottomColor="DarkBeige"
        >
            Partnere
        </Heading>
        <PartnerNavList />
        <AddPartnerButton marginTop={10} />
    </Flex>
);
