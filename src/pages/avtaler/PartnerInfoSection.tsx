import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';
import { ButtonGroup, Heading } from '@chakra-ui/react';

export const PartnerInfoSection: React.FC = ({ children }) => (
    <Box as="section" marginY={5} width="100%">
        {children}
    </Box>
);

export const PartnerInfoSectionHeader: React.FC = ({ children }) => (
    <Flex
        justifyContent="space-between"
        width="100%"
        borderBottom="2px solid"
        borderBottomColor="gray.200"
        marginBottom={4}
        paddingBottom={4}
    >
        {children}
    </Flex>
);

export const PartnerInfoSectionTitle: React.FC = ({ children }) => (
    <Heading as="h2" fontSize="2xl" fontWeight="medium">
        {children}
    </Heading>
);

export const PartnerInfoSectionButtons: React.FC = ({ children }) => (
    <ButtonGroup spacing="4" size="sm">
        {children}
    </ButtonGroup>
);

export const PartnerInfoSectionContent: React.FC = ({ children }) => <Box>{children}</Box>;
